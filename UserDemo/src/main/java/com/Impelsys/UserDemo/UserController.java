package com.Impelsys.UserDemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController
{
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/")
    public List <User> getCourses()
    {
        return userRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, value="/users")
    public void saveUser(@RequestBody User user)
    {
        userRepository.save(user);
    }
}
