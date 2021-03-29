package com.Impelsys.UserDemo.Service;

import com.Impelsys.UserDemo.Exception.RecordNotFoundException;
import com.Impelsys.UserDemo.Model.User;
import com.Impelsys.UserDemo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository repository;

    public User addUser(User user)
    {
        return repository.save(user);
    }

    public List <User> getAllUsers(Integer pageNo, Integer pageSize, String sortBy, String sortDirection)
    {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        Pageable paging = PageRequest.of(pageNo, pageSize, sort);

        Page <User> pagedResult = repository.findAll(paging);
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList <User>();
        }
    }

    public List<User> listAll(Integer pageNo, Integer pageSize, String sortBy, String sortDirection ,String keyword) {
        if (keyword != null)
        {
            Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() :
                    Sort.by(sortBy).descending();

            Pageable paging = PageRequest.of(pageNo, pageSize, sort);
            Page <User> pagedResult = repository.search(keyword,paging);

            if(pagedResult.hasContent()) {
                return pagedResult.getContent();
            } else {
                return new ArrayList <User>();
            }
        }
        else
        {
            Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() :
                    Sort.by(sortBy).descending();

            Pageable paging = PageRequest.of(pageNo, pageSize, sort);

            Page <User> pagedResult = repository.findAll(paging);
            if(pagedResult.hasContent()) {
                return pagedResult.getContent();
            } else {
                return new ArrayList <User>();
            }
        }

    }


    @Transactional(readOnly = true)
    public long getCountOfEntities() {
        long count = repository.count();
        return count;
    }

    public User getUserById(Long id) throws RecordNotFoundException
    {
        Optional <User> employee = repository.findById(id);

        if(employee.isPresent()) {
            return employee.get();
        } else {
            throw new RecordNotFoundException("No employee record exist for given id");
        }
    }

    public void deleteUserById(Long id) throws RecordNotFoundException
    {
        Optional <User> user = repository.findById(id);

        if(user.isPresent())
        {
            repository.deleteById(id);
        } else {
            throw new RecordNotFoundException("No employee record exist for given id");
        }
    }

    public void updateUser(User newuser) {
        // check if the user with the passed id exists or not
        // User userDB = repository.findById(user.getUserById()).orElseThrow();
        // If user exists then updated
        long id = newuser.getId();
        repository.findById(id)
                .map(user -> {
                    user.setFirstName(newuser.getFirstName());
                    user.setLastName(newuser.getLastName());
                    user.setEmail(newuser.getEmail());
                    user.setPhone(newuser.getPhone());
                    return repository.save(user);
                })
                .orElseGet(() -> {
                    newuser.setId(id);
                    return repository.save(newuser);
                });
    }
}
