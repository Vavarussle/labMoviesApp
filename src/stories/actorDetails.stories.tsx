import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import ActorDetails from "../components/actorDetails";
import SampleActor from "./sampleActors";

const meta = {
  title: "Actors/ActorDetails",
  component: ActorDetails,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ActorDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleCredits = [
  {
    id: 550,
    title: "Fight Club",
    character: "Tyler Durden",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    release_date: "1999-10-15",
  },
  {
    id: 680,
    title: "Pulp Fiction",
    character: "Jimmie Dimmick",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    release_date: "1994-09-10",
  },
];

export const Basic: Story = {
  args: {
    actor: {
      ...SampleActor,
      biography:
        "Brad Pitt is an American actor and film producer.",
      birthday: "1963-12-18",
      deathday: "",
      place_of_birth: "Shawnee, Oklahoma, USA",
      also_known_as: ["William Bradley Pitt"],
      homepage: "https://www.bradpitt.com",
    },
    credits: sampleCredits,
  },
};

Basic.storyName = "Default";

export const NoBiography: Story = {
  args: {
    actor: {
      ...SampleActor,
      biography: "",
      birthday: "",
      deathday: "",
      place_of_birth: "",
      homepage: "",
      also_known_as: [],
    },
    credits: [],
  },
};

NoBiography.storyName = "Missing Data";