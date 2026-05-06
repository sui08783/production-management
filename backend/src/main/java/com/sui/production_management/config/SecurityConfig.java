package com.sui.production_management.config;

import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * セキュリティー設定用のクラス
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }


  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOrigins(List.of(
        "http://localhost:5173",
        "https://your-app.onrender.com"
    ));
    config.setAllowedMethods(List.of("*"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    return source;
  }


  /**
   * ログインの設定を定義 非ログイン時とログイン時でのアクセス出来るページ ログインフォームのURLと、ログイン時のページ遷移
   *
   * @param http セキュリティの設定
   * @return セキュリティの設定を完成させ、spring本体へSecurityFilterChainを返す
   * @throws Exception セキュリティ設定中に発生する例外
   */


  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())//CSRF設定をオフ
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeHttpRequests(auths -> auths
            .requestMatchers(
                "/",
                "/index.html",
                "/assets/**",
                "/api/login"
            ).permitAll()
            .anyRequest().authenticated()
        )

////        ログインフォームページの設定

//        .formLogin(login -> login.disable())
        .formLogin(login -> login
            .loginProcessingUrl("/api/login")
            .successHandler((req, res, auth) -> {
              res.setStatus(200);
              res.setContentType("application/json");


            })
            .failureHandler((req, res, ex) -> {
              res.setStatus(401);
            })
        )

        .exceptionHandling(e -> e
            .authenticationEntryPoint((req, res, ex) -> {
              res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            })
        )


        //        ログアウトの設定
        .logout(logout -> logout
            .logoutUrl("/api/logout")
            .logoutSuccessHandler((req, res, auth) -> {
              res.setStatus(200);
            })
        );



    return http.build();
  }


}
