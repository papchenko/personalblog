package com.papchenko.blog.repo;

import com.papchenko.blog.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepo extends JpaRepository<User, String> {
}
