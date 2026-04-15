package com.sui.production_management.service;


import com.sui.production_management.Entity.Users;
import com.sui.production_management.config.LoginUserDetails;
import com.sui.production_management.repository.UserRepository;
import java.util.Optional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LoginUserDetailService implements UserDetailsService {

  private  final UserRepository userRepository;

  public  LoginUserDetailService(UserRepository userRepository){
    this.userRepository =userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
    Optional<Users> _user = userRepository.findByUsername(username);

    return _user.map(user->new LoginUserDetails(user)).orElseThrow(()->new UsernameNotFoundException("not found=" + username));
  }


}
