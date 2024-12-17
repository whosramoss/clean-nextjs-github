
import ValidationError from "src/layers/domain/errors/validation-error";
import { z } from "zod";

type Presenter = {
  url: string;
  description: string;
  name: string;
}

type Model = z.infer<typeof Organization.schema>

export class Organization {
  static presenter: Presenter;

  static model: Model;

  static schema = z.object({
    login: z.string(),
    id: z.number(),
    node_id: z.string(),
    url: z.string(),
    repos_url: z.string(),
    events_url: z.string(),
    hooks_url: z.string(),
    issues_url: z.string(),
    members_url: z.string(),
    public_members_url: z.string(),
    avatar_url: z.string(),
    description: z.string(),
    name: z.string(),
    company: z.null(),
    blog: z.string(),
    location: z.string(),
    email: z.string(),
    twitter_username: z.string(),
    is_verified: z.boolean(),
    has_organization_projects: z.boolean(),
    has_repository_projects: z.boolean(),
    public_repos: z.number(),
    public_gists: z.number(),
    followers: z.number(),
    following: z.number(),
    html_url: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    archived_at: z.null(),
    type: z.string(),
  });


  static toPresenter(v: Model): Presenter {
    return {
      url: v.url,
      description: v.description,
      name: v.name,
    }
  }

  static toModel(value: any): Model {
    const v = this.schema.safeParse(value);
    if (v.success) return value;
    throw new ValidationError({ message: 'Error parsing to model', errors: [v.error?.name] })
  }
}
