import type { Meta, StoryObj } from "@storybook/react";
import ActorCard from "../components/actorCard";
import SampleActor from "./sampleActors";
import { MemoryRouter } from "react-router";
import ActorsContextProvider from "../contexts/actorsContext";
import AddToFavouriteActors from "../components/cardIcons/addToFavouriteActors";

const meta = {
  title: "Actors/ActorCard",
  component: ActorCard,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
    (Story) => (
      <ActorsContextProvider>
        <Story />
      </ActorsContextProvider>
    ),
  ],
} satisfies Meta<typeof ActorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    actor: SampleActor,
    action: (actor) => (
      <AddToFavouriteActors {...actor} />
    ),
  },
};

Basic.storyName = "Default";

const noImageActor = {
  ...SampleActor,
  profile_path: undefined,
};

export const Exceptional: Story = {
  args: {
    actor: noImageActor,
    action: (actor) => (
      <AddToFavouriteActors {...actor} />
    ),
  },
};

Exceptional.storyName = "No Profile Image";