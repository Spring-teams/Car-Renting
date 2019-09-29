package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Admin;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

public class AdminDao {
    private DataSource dataSource;
    private JdbcTemplate template;
    public AdminDao(DataSource ds){
        this.dataSource=ds;
        this.template= new JdbcTemplate(this.dataSource);
    }
    public Admin getAdminById(String Adminid){
        String SQL="Select * from admin where adminId = ?";
        Admin admin = this.template.queryForObject(SQL,new AdminMapper(),Adminid);
        return admin;
    }
}
