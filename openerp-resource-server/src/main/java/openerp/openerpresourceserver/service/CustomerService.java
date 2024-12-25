package openerp.openerpresourceserver.service;

import openerp.openerpresourceserver.controller.entity.Customer;
import openerp.openerpresourceserver.dto.CustomerDTO;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;
import java.util.UUID;

public interface CustomerService {
    List<Customer> getAllCustomers();

    Customer getCustomerById(UUID id);

    Customer addCustomer(CustomerDTO customer, JwtAuthenticationToken token);

    void deleteCustomer(String id);
}
