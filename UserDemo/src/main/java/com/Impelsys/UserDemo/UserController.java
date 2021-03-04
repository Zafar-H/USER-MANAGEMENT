package com.Impelsys.UserDemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController //creation of RESTful web services.
public class UserController
{
    @Autowired
    private UserRepository userRepository;

    //used to map Spring MVC controller methods

    //Display all the user data
    @RequestMapping("/")
    public List <User> getUsers()
    {
        return userRepository.findAll();
    }

    //Display user data by id
    @RequestMapping("/{id}")
    public User getUserById(@PathVariable("id") long id)
    {
        User userdetails = userRepository.getOne( id );
        return userdetails;
    }

    //Add a new user details
    @RequestMapping(method = RequestMethod.POST, value="/users")
    public void saveUser(@RequestBody User user)
    {
        userRepository.save(user);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "{id}")
    public void deleteUser(@PathVariable("id") long id)
    {
       userRepository.deleteById( id );
    }



}
