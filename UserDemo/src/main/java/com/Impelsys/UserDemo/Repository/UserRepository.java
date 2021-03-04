package com.Impelsys.UserDemo.Repository;

import com.Impelsys.UserDemo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}