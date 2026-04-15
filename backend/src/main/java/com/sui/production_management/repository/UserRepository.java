package com.sui.production_management.repository;

import com.sui.production_management.Entity.Users;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
Optional<Users> findByUsername(String username);
}
