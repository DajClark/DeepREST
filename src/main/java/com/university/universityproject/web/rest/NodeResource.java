package com.university.universityproject.web.rest;
import com.university.universityproject.domain.Node;
import com.university.universityproject.repository.NodeRepository;
import com.university.universityproject.web.rest.errors.BadRequestAlertException;
import com.university.universityproject.web.rest.util.HeaderUtil;
import com.university.universityproject.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Node.
 */
@RestController
@RequestMapping("/api")
public class NodeResource {

    private final Logger log = LoggerFactory.getLogger(NodeResource.class);

    private static final String ENTITY_NAME = "node";

    private final NodeRepository nodeRepository;

    public NodeResource(NodeRepository nodeRepository) {
        this.nodeRepository = nodeRepository;
    }

    /**
     * POST  /nodes : Create a new node.
     *
     * @param node the node to create
     * @return the ResponseEntity with status 201 (Created) and with body the new node, or with status 400 (Bad Request) if the node has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/nodes")
    public ResponseEntity<Node> createNode(@Valid @RequestBody Node node) throws URISyntaxException {
        log.debug("REST request to save Node : {}", node);
        if (node.getId() != null) {
            throw new BadRequestAlertException("A new node cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Node result = nodeRepository.save(node);
        return ResponseEntity.created(new URI("/api/nodes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /nodes : Updates an existing node.
     *
     * @param node the node to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated node,
     * or with status 400 (Bad Request) if the node is not valid,
     * or with status 500 (Internal Server Error) if the node couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/nodes")
    public ResponseEntity<Node> updateNode(@Valid @RequestBody Node node) throws URISyntaxException {
        log.debug("REST request to update Node : {}", node);
        if (node.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Node result = nodeRepository.save(node);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, node.getId().toString()))
            .body(result);
    }

    /**
     * GET  /nodes : get all the nodes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of nodes in body
     */
    @GetMapping("/nodes")
    public ResponseEntity<List<Node>> getAllNodes(Pageable pageable) {
        log.debug("REST request to get a page of Nodes");
        Page<Node> page = nodeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/nodes");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /nodes/:id : get the "id" node.
     *
     * @param id the id of the node to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the node, or with status 404 (Not Found)
     */
    @GetMapping("/nodes/{id}")
    public ResponseEntity<Node> getNode(@PathVariable Long id) {
        log.debug("REST request to get Node : {}", id);
        Optional<Node> node = nodeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(node);
    }

    /**
     * DELETE  /nodes/:id : delete the "id" node.
     *
     * @param id the id of the node to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/nodes/{id}")
    public ResponseEntity<Void> deleteNode(@PathVariable Long id) {
        log.debug("REST request to delete Node : {}", id);
        nodeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
