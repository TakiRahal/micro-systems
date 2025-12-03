package com.user.controller;

import com.user.dto.RegisterDTO;
import com.user.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final RedisTemplate<String, Object> redisTemplate;

    @GetMapping("/public")
    public String getUserByIdTest(){
        return "Hello User by Id";
    }

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterDTO registerDTO){
        userService.registerUser(registerDTO);
        return new ResponseEntity<>("Add successfully", HttpStatus.CREATED);
    }

    @GetMapping("/private/list-users")
    public ResponseEntity<?> listUsers(){
        return new ResponseEntity<>(userService.listUsers(), HttpStatus.OK);
    }

    @GetMapping("/private/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id){
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping("/private/list-groups")
    public ResponseEntity<?> listGroups(){
        log.debug("list of groups start ");
        return new ResponseEntity<>(userService.listGroups(), HttpStatus.OK);
    }

    @GetMapping("/private/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal Jwt jwt) {
        log.debug("currentUser start ");
        return new ResponseEntity<>(userService.getCurrentUser(jwt), HttpStatus.OK);
    }

    @GetMapping("/private/redis")
    public ResponseEntity<?> getAllKeysAndValues() {
        log.debug("currentUser start ");
        Map<String, Object> result = new HashMap<>();
        Set<String> keys = redisTemplate.keys("*");

        if (keys != null) {
            for (String key : keys) {
                Object value = redisTemplate.opsForValue().get(key);
                result.put(key, value);
            }
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
