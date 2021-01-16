import { CreatorUserId } from "./creator-user-id";
import { OrgId } from "./org-id";

export interface Deal {
  org_id: OrgId;
  creator_user_id: CreatorUserId;
  value: number;
}
