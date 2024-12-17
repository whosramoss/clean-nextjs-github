
import ValidationError from "src/layers/domain/errors/validation-error";
import { z } from "zod";

type Presenter = {
  type: string
  actor: string;
}

type Model = z.infer<typeof Event.schema>

export class Event {
  static presenter: Presenter;

  static model: Model;

  static schema = z.object({
    id: z.string(),
    type: z.string(),
    actor: z.object({
      id: z.number(),
      login: z.string(),
      display_login: z.string(),
      gravatar_id: z.string(),
      url: z.string(),
      avatar_url: z.string(),
    }),
    repo: z.object({ id: z.number(), name: z.string(), url: z.string() }),
    payload: z.object({
      ref: z.string().nullable().optional(),
      ref_type: z.string().nullable().optional(),
      master_branch: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
      pusher_type: z.string().nullable().optional(),
    }).nullable().optional(),
    public: z.boolean(),
    created_at: z.string(),
    org: z.object({
      id: z.number().nullable().optional(),
      login: z.string().nullable().optional(),
      gravatar_id: z.string().nullable().optional(),
      url: z.string().nullable().optional(),
      avatar_url: z.string().nullable().optional(),
    }).nullable().optional(),
  });

  static toPresenter(v: Model): Presenter {
    return {
      type: v.type,
      actor: v.actor.login,
    }
  }

  static toModel(value: any): Model {
    const v = this.schema.safeParse(value);
    if (v.success) return value;
    throw new ValidationError({ message: 'Error parsing to model', errors: [v.error?.name] })
  }

}