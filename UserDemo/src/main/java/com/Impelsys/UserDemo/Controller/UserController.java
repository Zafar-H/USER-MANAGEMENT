package com.Impelsys.UserDemo.Controller;

import com.Impelsys.UserDemo.Exception.RecordNotFoundException;
import com.Impelsys.UserDemo.Model.User;
import com.Impelsys.UserDemo.Repository.UserRepository;
import com.Impelsys.UserDemo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/users") //creation of RESTful web services.
@CrossOrigin(origins = "http://localhost:4200")

public class UserController
{
    @Autowired
    UserService service;


    //Mapping to get all users
    @GetMapping
    public ResponseEntity <List<User>> getAllUsers(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDir)
    {
        List<User> list = service.getAllUsers(pageNo, pageSize, sortBy, sortDir);

        return new ResponseEntity<List<User>>(list, new HttpHeaders(), HttpStatus.OK);
    }

    //Searching through records using keywords
    @GetMapping(value = {"/search", "/search/{keyword}"})
    public ResponseEntity <List<User>> FilterUsers(     @RequestParam(defaultValue = "0") Integer pageNo,
                                                        @RequestParam(defaultValue = "5") Integer pageSize,
                                                        @RequestParam(defaultValue = "id") String sortBy,
                                                        @RequestParam(defaultValue = "ASC") String sortDir,
                                                        @PathVariable( value = "keyword" , required = false)  String keyword)
    {
        List<User> listUsers = service.listAll(pageNo, pageSize, sortBy, sortDir,keyword);

        System.out.println(pageNo +" and" + pageSize);

        return new ResponseEntity<List<User>>(listUsers, new HttpHeaders(), HttpStatus.OK);
    }


    //Display user data by id
    @GetMapping("/{id}")
    public ResponseEntity<User> getEmployeeById(@PathVariable("id") Long id) throws RecordNotFoundException
    {
        User entity = service.getUserById(id);

        return new ResponseEntity<User>(entity, new HttpHeaders(), HttpStatus.OK);
    }

    //Get the total number of records
    @GetMapping("/count")
    public long totalNumberOfRecords()
    {
        long count = service.getCountOfEntities();
        return count;
    }

    //Deleting the user by Id
    @DeleteMapping("/{id}")
    public HttpStatus deleteUserById(@PathVariable("id") Long id) throws RecordNotFoundException
    {
        service.deleteUserById(id);
        return HttpStatus.OK;
    }


    // Insert user record
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User addUser(@RequestBody User user)
    {
        return service.addUser(user);
    }



    //Updating a user's details
    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        try {
            service.updateUser(user);
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        catch(NoSuchElementException ex)
        {
            // log the error message
            System.out.println(ex.getMessage());
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
    }

}
