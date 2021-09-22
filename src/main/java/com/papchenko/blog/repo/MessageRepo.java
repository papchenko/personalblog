package com.papchenko.blog.repo;

import com.papchenko.blog.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepo extends JpaRepository<Message, Long> {
}
