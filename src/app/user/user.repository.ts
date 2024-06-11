import { DataSource, EntityManager, Repository } from "typeorm";
import { User } from "./entities";
import { Injectable } from "@nestjs/common";
import { Endpoint } from "../endpoint/entities";

@Injectable()
export class UserRepository extends Repository<User> {

  constructor(dataSource: DataSource) {
    super(User, new EntityManager(dataSource));
  }
  
    async findUserEndpoints(idpUserId: string): Promise<Endpoint[]> {
        return this.query(`
          SELECT e.id, e.code, e.description, e.path, e.method, e.status, e.created_at, e.created_by, e.modified_at, e.modified_by
          FROM endpoint e
          INNER JOIN privilege_endpoint pe ON e.id = pe.endpoint_id
          INNER JOIN privilege p ON pe.privilege = p.id
          INNER JOIN role_privilege rp ON p.id = rp.privilege_id
          INNER JOIN role r ON rp.role_id = r.id
          INNER JOIN user_group_role ugr ON r.id = ugr.role_id
          INNER JOIN user_group ug ON ugr.user_group_id = ug.id
          INNER JOIN user_user_group uug ON ug.id = uug.user_group_id
          INNER JOIN "user" u ON uug.user_id = u.id
          WHERE u.ldp_user_id = $1
        `, [idpUserId]);
      }
}