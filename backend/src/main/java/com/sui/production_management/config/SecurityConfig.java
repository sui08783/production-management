package com.sui.production_management.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


/**
 * セキュリティー設定用のクラス
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig  {

@Bean
PasswordEncoder passwordEncoder(){
  return new BCryptPasswordEncoder();
}
//
//  @Bean
//  InMemoryUserDetailsManager userDetailService(){
//    UserDetails admin = User
//        .withUsername("admin")
//        .password(passwordEncoder().encode("admin123"))
//        .roles("ADMIN")
//        .build();
//
//    UserDetails user = User
//        .withUsername("user")
//        .password(passwordEncoder().encode("user123"))
//        .roles("USER")
//        .build();
//
//    return new InMemoryUserDetailsManager(admin,user);
//  }




  /**
   *ログインの設定を定義
   * 非ログイン時とログイン時でのアクセス出来るページ
   * ログインフォームのURLと、ログイン時のページ遷移
   *
   * @param http セキュリティの設定
   *
   * @return セキュリティの設定を完成させ、spring本体へSecurityFilterChainを返す
   * @throws Exception セキュリティ設定中に発生する例外
   */




  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
    http
        .csrf(csrf -> csrf.disable()) //CSRF設定をオフ
        .authorizeHttpRequests(auths -> auths

            .requestMatchers("/","/login").permitAll() //ログインしなくてもアクセス出来るページを指定
            .anyRequest().authenticated() // その他のページはログインしないと見られない
        )

//        ログインフォームページの設定
        .formLogin(login ->login
//            .loginPage("/login")
            .defaultSuccessUrl("/",true));

    return http.build();
  }
}
