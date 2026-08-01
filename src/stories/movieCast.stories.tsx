import type { Meta, StoryObj } from "@storybook/react";
import MovieCast from "../components/movieCast";
import { MemoryRouter } from "react-router";

const meta = {
  title: "Movies/MovieCast",
  component: MovieCast,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof MovieCast>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleCast = [
  {
    id: 287,
    name: "Brad Pitt",
    character: "Tyler Durden",
    profile_path: "/kU3B75TyRiCgE270EyZnHjfivoq.jpg",
    order: 0,
  },
  {
    id: 819,
    name: "Edward Norton",
    character: "The Narrator",
    profile_path: "/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg",
    order: 1,
  },
];

export const Basic: Story = {
  args: {
    cast: sampleCast,
  },
};

Basic.storyName = "Default";

export const EmptyCast: Story = {
  args: {
    cast: [],
  },
};

EmptyCast.storyName = "No Cast";