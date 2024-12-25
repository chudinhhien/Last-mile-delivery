package openerp.openerpresourceserver.service;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import openerp.openerpresourceserver.controller.entity.Customer;
import openerp.openerpresourceserver.controller.entity.Order;
import openerp.openerpresourceserver.controller.entity.User;
import openerp.openerpresourceserver.converter.CustomerConverter;
import openerp.openerpresourceserver.dto.CustomerDTO;
import openerp.openerpresourceserver.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Log4j2
@AllArgsConstructor(onConstructor_ = @Autowired)
@Service
public class CustomerServiceImpl implements CustomerService {
    private CustomerRepo customerRepo;
    private UserService userService;
    private CustomerConverter customerConverter;
    public List<Customer> getAllCustomers() {
        List<Customer> customers = customerRepo.findAllByStatus("ABLED");
        return customers;
    }

    public Customer getCustomerById(UUID id) {
        return customerRepo.findById(id).orElse(null);
    }

    @Override
    public Customer addCustomer(CustomerDTO customer, JwtAuthenticationToken token) {
        String userId = token.getName();
        User user = userService.getUserById(userId);
        Customer newCustomer = customerConverter.convertToEntity(customer);
        newCustomer.setUser(user);
        if(customer.getId()!=null){
            Customer oldCustomer = customerRepo.findById(customer.getId()).orElse(null);
            List<Order> orders = oldCustomer.getOrders();
            newCustomer.setOrders(orders);
            return customerRepo.save(newCustomer);
        }else {
            return customerRepo.save(newCustomer);
        }
    }

    @Override
    public void deleteCustomer(String id) {
        UUID uuid = UUID.fromString(id);
        Customer customer = customerRepo.findById(uuid).orElse(null);
        customer.setStatus("DISABLED");
        customerRepo.save(customer);
    }
}
