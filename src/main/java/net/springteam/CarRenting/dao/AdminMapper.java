package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Admin;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AdminMapper implements RowMapper<Admin> {
    public Admin mapRow(ResultSet rs, int numRow) throws SQLException{
        Admin admin= new Admin();
        admin.setAdminId(rs.getString("adminId"));
        admin.setAdminEmail(rs.getString("email"));
        admin.setAdminName(rs.getString("adminName"));
        admin.setCompanyName(rs.getString("companyName"));
        admin.setAdminPass("unknown");
        return admin;
    }
}
