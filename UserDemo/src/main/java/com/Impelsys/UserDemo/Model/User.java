//JPA Entity : Creating the data model
package com.Impelsys.UserDemo.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;


@Entity   //specifies that the class is an entity
@Table(name="userdata") //Specify the table name
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User
{
    @Id //specifies the primary key of an entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) //provides for the specification of generation strategies for the values of primary keys
    private  long id;

    @Column(name = "first_name") // Specifies the mapped column for a persistent property or field.
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private long phone;

    //Getters and Setters for all the fields
    public long getId()
    {
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public String getFirstName()
    {
        return firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public long getPhone()
    {
        return phone;
    }

    public void setPhone(long phone)
    {
        this.phone = phone;
    }
}

