package openerp.openerpresourceserver.repo;

import openerp.openerpresourceserver.controller.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepo extends JpaRepository<Order, UUID> {
    List<Order> findAllByStatus(String status);
}
