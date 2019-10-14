package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Customer;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.List;

public class CustomerDao {
    private DataSource dataSource;
    private JdbcTemplate template;
    public CustomerDao(DataSource ds){
        this.dataSource=ds;
        this.template= new JdbcTemplate(this.dataSource);
    }
    public Boolean checkIfExist(Customer customer){
        Customer customer1;
        String SQL="Select * from customer where customerId = ?";
        List<Customer> customers = this.template.query(SQL,new CustomerMapper(),customer.getCustomerId());
        return customers.size()==0 ? false : true;
    }
    public Boolean comfirmUser(Customer customer){
        String SQL="select * from customer where customerId = ? and pass=?";
        List<Customer> customers=this.template.query(SQL, new CustomerMapper(),customer.getCustomerId(),customer.getPass());
        return customers.size()==0 ? false : true;
    }
    public void insertCustomer(Customer customer){
        if(checkIfExist(customer)){
            return ;
        }
        String SQL="insert into customer(customerId,name,phone,companyname,gender,birthday,email,pass)" +
                " values (?,?,?,?,?,?,?,?)";
        this.template.update(SQL,customer.getCustomerId(),customer.getName(),customer.getPhone(),customer.getCompanyName(),customer.getGender(),customer.getBirthday(),customer.getEmail(),customer.getPass());
        return ;
    }
    public Customer getCustomerById(String customerId){
        String SQL="select * from customer where customerId = ?";
        Customer customer = this.template.queryForObject(SQL,new CustomerMapper(), customerId);
        return customer;
    }
    public void updateCustomer(Customer customer){
        String SQL="Update customer set name = ? , phone=?, pass=? , companyName=? , gender=? , birthday= ?, email=? where customerId=?";
        this.template.update(SQL,customer.getName(), customer.getPhone(), customer.getPass(),customer.getCompanyName(),customer.getGender(),customer.getBirthday(),customer.getEmail(), customer.getCustomerId());
        return ;
    }
}
