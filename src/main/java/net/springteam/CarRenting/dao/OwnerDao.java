package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Owner;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

public class OwnerDao {
    private DataSource dataSource;
    private JdbcTemplate template;
    public OwnerDao(DataSource ds){
        this.dataSource=ds;
        this.template= new JdbcTemplate(this.dataSource);
    }
    public Owner getOwnerById(String Ownerid){
        String SQL="Select * from owner where ownerId = ?";
        Owner admin = this.template.queryForObject(SQL,new AdminMapper(),Ownerid);
        return admin;
    }
}
