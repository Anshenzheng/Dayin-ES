package com.dayin.controller;

import com.dayin.dto.ApiResponse;
import com.dayin.dto.LoginRequest;
import com.dayin.entity.Admin;
import com.dayin.repository.AdminRepository;
import com.dayin.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        if (!adminRepository.existsByUsername("admin")) {
            Admin admin = new Admin();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setName("管理员");
            adminRepository.save(admin);
        }
    }

    @PostMapping("/login")
    public ApiResponse<Map<String, Object>> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
            String token = jwtTokenUtil.generateToken(userDetails);

            Admin admin = adminRepository.findByUsername(request.getUsername()).orElse(null);

            Map<String, Object> result = new HashMap<>();
            result.put("token", token);
            result.put("username", userDetails.getUsername());
            result.put("name", admin != null ? admin.getName() : "");

            return ApiResponse.success("登录成功", result);
        } catch (Exception e) {
            return ApiResponse.error("用户名或密码错误");
        }
    }

    @GetMapping("/me")
    public ApiResponse<Map<String, Object>> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Admin admin = adminRepository.findByUsername(userDetails.getUsername()).orElse(null);

            Map<String, Object> result = new HashMap<>();
            result.put("username", userDetails.getUsername());
            result.put("name", admin != null ? admin.getName() : "");

            return ApiResponse.success(result);
        }
        return ApiResponse.error("未登录");
    }
}
