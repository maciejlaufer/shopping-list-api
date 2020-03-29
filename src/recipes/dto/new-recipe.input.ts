import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewRecipeInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [String])
  ingredients: string[];
}
