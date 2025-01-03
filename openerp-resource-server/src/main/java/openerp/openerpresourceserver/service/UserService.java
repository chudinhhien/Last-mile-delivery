package openerp.openerpresourceserver.service;

import openerp.openerpresourceserver.controller.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {

    List<User> getAllUsers();

    User getUserById(String id);

    void synchronizeUser(String userId, String email, String firstName, String lastName);

}
