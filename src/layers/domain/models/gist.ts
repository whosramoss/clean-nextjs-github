import ValidationError from "src/layers/domain/errors/validation-error";
import { z } from "zod";

type Presenter = {
  urlHtml: string;
  urlOwner: string;
}

type Model = z.infer<typeof Gist.schema>

export class Gist {
  static presenter: Presenter;

  static model: Model;

  static schema = z.object({
    url: z.string(),
    forks_url: z.string(),
    commits_url: z.string(),
    id: z.string(),
    node_id: z.string(),
    git_pull_url: z.string(),
    git_push_url: z.string(),
    html_url: z.string(),
    files: z.object({}),
    public: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    description: z.string().nullable(),
    comments: z.number(),
    user: z.null(),
    comments_url: z.string(),
    owner: z.object({
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
    }),
    truncated: z.boolean(),
  });

  static toPresenter(v: Model): Presenter {
    return {
      urlHtml: v.html_url,
      urlOwner: v.owner.html_url,
    }
  }

  static toModel(value: any): Model {
    const v = this.schema.safeParse(value);
    if (v.success) return value;
    throw new ValidationError({ message: 'Error parsing to model', errors: [v.error?.name] })
  }
}
