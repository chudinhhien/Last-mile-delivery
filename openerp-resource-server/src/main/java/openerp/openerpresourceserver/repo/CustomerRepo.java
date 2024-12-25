package openerp.openerpresourceserver.repo;

import openerp.openerpresourceserver.controller.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CustomerRepo extends JpaRepository<Customer, UUID> {
    List<Customer> findAllByStatus(String status);
}
