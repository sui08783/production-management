package com.sui.production_management.config;

import com.sui.production_management.Entity.Users;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collection;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@EqualsAndHashCode
public class LoginUserDetails implements UserDetails {

  private final String username;
  private final String password;
  private final Collection<? extends GrantedAuthority> authorities;

  public LoginUserDetails(Users users) {
    this.username = users.getUsername();
    this.password = users.getPassword();
    this.authorities = Arrays.stream(users.getRole().split(","))
        .map(role -> new SimpleGrantedAuthority(role)).toList();
  }

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
  // ロールのコレクションを返す
  return authorities;
}


  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    // ログイン名を返す
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    //  ユーザーが期限切れでなければtrueを返す
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    //  ユーザーがロックされていなければtrueを返す
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    //  パスワードが期限切れでなければtrueを返す
    return true;
  }

  @Override
  public boolean isEnabled() {
    //  ユーザーが有効ならtrueを返す
    return true;
  }
}
