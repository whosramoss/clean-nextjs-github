import ValidationError from "src/layers/domain/errors/validation-error";
import { z } from "zod";

type Presenter = {
  name: string;
  avatar_url: string;
  bio: string;
}

type Model = z.infer<typeof User.schema>

export class User {
  static presenter: Presenter;

  static model: Model;

  static schema = z.object({
    login: z.string(),
    id: z.number(),
    node_id: z.string(),
    avatar_url: z.string(),
    gravatar_id: z.string(),
    url: z.string(),
    html_url: z.string(),
    followers_url: z.string(),
    following_url: z.string(),
    gists_url: z.string(),
    starred_url: z.string(),
    subscriptions_url: z.string(),
    organizations_url: z.string(),
    repos_url: z.string(),
    events_url: z.string(),
    received_events_url: z.string(),
    type: z.string(),
    user_view_type: z.string(),
    site_admin: z.boolean(),
    name: z.string(),
    company: z.null(),
    blog: z.string(),
    location: z.string(),
    email: z.null(),
    hireable: z.null(),
    bio: z.string(),
    twitter_username: z.null(),
    public_repos: z.number(),
    public_gists: z.number(),
    followers: z.number(),
    following: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
  });



  static toPresenter(v: Model): Presenter {
    return {
      name: v.name,
      avatar_url: v.avatar_url,
      bio: v.bio,
    }
  }

  static toModel(value: any): Model {
    const v = this.schema.safeParse(value);
    if (v.success) return value;
    throw new ValidationError({ message: 'Error parsing to model', errors: [v.error?.name] })
  }
}
