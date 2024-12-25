package openerp.openerpresourceserver.repo;


import openerp.openerpresourceserver.controller.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepo extends JpaRepository<User, String> {

}
