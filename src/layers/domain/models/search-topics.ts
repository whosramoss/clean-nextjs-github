
import ValidationError from "src/layers/domain/errors/validation-error";
import { z } from "zod";

type Presenter = {
  count: number;
  incomplete_results: boolean;
  items: {
    name?: string | null;
    score?: number | null;
  }[]
}

type Model = z.infer<typeof Search.schema>

export class Search {
  static presenter: Presenter;

  static model: Model;

  static schema = z.object({
    total_count: z.number(),
    incomplete_results: z.boolean(),
    items: z.array(
      z.object({
        name: z.string().nullable(),
        display_name: z.string().nullable(),
        short_description: z.string().nullable(),
        description: z.string().nullable(),
        created_by: z.string().nullable(),
        released: z.string().nullable(),
        created_at: z.string().nullable(),
        updated_at: z.string().nullable(),
        featured: z.boolean().nullable(),
        curated: z.boolean().nullable(),
        score: z.number().nullable(),
      })
    )
  })


  static toPresenter(v: Model): Presenter {
    return {
      count: v.total_count,
      incomplete_results: v.incomplete_results,
      items: v.items.map((i) => ({
        name: i.name,
        score: i.score
      }))
    }
  }

  static toModel(value: any): Model {
    const v = this.schema.safeParse(value);
    if (v.success) return value;
    throw new ValidationError({ message: 'Error parsing to model', errors: [v.error?.name] })
  }
}
