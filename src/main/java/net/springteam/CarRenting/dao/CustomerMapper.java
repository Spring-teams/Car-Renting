package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Customer;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomerMapper implements RowMapper<Customer> {
    @Override
    public Customer mapRow(ResultSet resultSet, int i) throws SQLException {
        Customer customer = new Customer();
        customer.setCustomerId(resultSet.getString("customerId"));
        customer.setCustomerName(resultSet.getString("customerName"));
        customer.setCustomerPhone(resultSet.getString("customerPhone"));
        customer.setBirthday(resultSet.getDate("birthday"));
        customer.setGender(resultSet.getString("gender"));
        customer.setCustomerCompany(resultSet.getString("customerCompany"));
        customer.setEmail(resultSet.getString("email"));
        return customer;
    }
}
