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
    private Boolean checkIfExist(Customer customer){
        Customer customer1;
        String SQL="Select * from customer where customerId = ?";
        List<Customer> customers = this.template.query(SQL,new CustomerMapper(),customer.getCustomerId());
        return customers.size()==0 ? false : true;
    }
    public Boolean comfirmUser(Customer customer){
        String SQL="select * from customer where customerId=? and pass=?";
        List<Customer> customers=this.template.query(SQL, new CustomerMapper(),customer.getCustomerId(),customer.getPass());
        return customers.size()==0 ? false : true;
    }
    public void insertCustomer(Customer customer){
        if(checkIfExist(customer)){
            return ;
        }
        String SQL="insert into customer(customerId,customerName,customerPhone,customerCompany,gender,birthday,email)" +
                " values (?,?,?,?,?,?,?)";
        this.template.update(SQL,customer.getCustomerId(),customer.getCustomerName(),customer.getCustomerPhone(),customer.getCustomerCompany(),customer.getGender(),customer.getBirthday(),customer.getEmail());
        return ;
    }
    public Customer getCustomerById(String customerId){
        String SQL="select * from customer where customerId = ?";
        Customer customer = this.template.queryForObject(SQL,new CustomerMapper(), customerId);
        return customer;
    }
}
