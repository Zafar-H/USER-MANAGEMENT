package com.Impelsys.UserDemo.Controller;

import com.Impelsys.UserDemo.Model.User;
import com.Impelsys.UserDemo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController //creation of RESTful web services.
public class UserController
{
    @Autowired
    private UserRepository userRepository;

    //used to map Spring MVC controller methods

    //Display all the user data
    @RequestMapping("/users")
    public List <User> getUsers()
    {
        return userRepository.findAll();
    }

    //Display user data by id
    @RequestMapping("/users/{id}")
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

    //Deleting the user by Id
    @RequestMapping(method = RequestMethod.DELETE, value = "/users/{id}")
    public void deleteUser(@PathVariable("id") long id)
    {
       userRepository.deleteById( id );
    }

    //Updating a user's details
    @PutMapping("/users/{id}")
    User updateUser(@RequestBody User updated_user, @PathVariable Long id) {

        return userRepository.findById(id)
                .map(user -> {
                    user.setFirstName(updated_user.getFirstName());
                    user.setLastName(updated_user.getLastName());
                    user.setEmail(updated_user.getEmail());
                    user.setPhone(updated_user.getPhone());
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    updated_user.setId(id);
                    return userRepository.save(updated_user);
                });
    }

}
