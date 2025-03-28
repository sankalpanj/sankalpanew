import { z } from "zod";

export interface Member {
  name: string;
  designation: string;
  imageSrc: string;
}

const MEMBERS: Member[] = [
  {
    name: "Ajit Parhi",
    designation: "Member",
    imageSrc: "/images/members/aj_ph.jpeg",
  },
  {
    name: "Anamika Banerjee",
    designation: "President",
    imageSrc: "/images/members/anmk_bnj_presd.jpeg",
  },
  {
    name: "Anjanita Das",
    designation: "Member",
    imageSrc: "/images/members/Member_AnjanitaDas.jpeg",
  },
  {
    name: "Ayona Biswas",
    designation: "Member",
    imageSrc: "/images/members/ay_bsw.jpeg",
  },
  {
    name: "Bishakha Ghoshal",
    designation: "Secretary",
    imageSrc: "/images/members/bisakha.jpeg",
  },
  {
    name: "Biswajit Santra",
    designation: "Member",
    imageSrc: "/images/members/bs_snt.jpeg",
  },
  {
    name: "Chaiti Banerjee",
    designation: "Member",
    imageSrc: "/images/members/ChaitaiBanerjee.jpeg",
  },
  {
    name: "Deepshikha Ghosh",
    designation: "Member",
    imageSrc: "/images/members/deepshikha_member.jpeg",
  },
  {
    name: "Gangotri Dey",
    designation: "Member",
    imageSrc: "/images/members/Gng_dey.jpeg",
  },
  {
    name: "Jaya Chakrabarti",
    designation: "Member",
    imageSrc: "/images/members/jaya.jpeg",
  },
  {
    name: "Kakoli Bhattacharyya",
    designation: "Member",
    imageSrc: "/images/members/Member_Kakoli_Bhattacharyya.jpeg",
  },
  {
    name: "Koustav Ghosal",
    designation: "Member",
    imageSrc: "/images/members/kv_gh.jpeg",
  },
  {
    name: "Koyeli Mukherjee",
    designation: "Member",
    imageSrc: "/images/members/Member_KoyeliMukherjee.jpeg",
  },
  {
    name: "Mahua Chakraborti",
    designation: "Assistant Secretary",
    imageSrc: "/images/members/AssistantSecetary_MahuaChakraborti.jpeg",
  },
  {
    name: "Manas Bhattacharyya",
    designation: "Member",
    imageSrc: "/images/members/Member_ManasBhattacharyya.jpeg",
  },
  {
    name: "Nemai Ghosh",
    designation: "Vice President & Treasurer",
    imageSrc: "/images/members/ng_vp_t.jpeg",
  },
  {
    name: "Rama Duvvuri",
    designation: "Member",
    imageSrc: "/images/members/rama_duvvuri_member.jpeg",
  },
  {
    name: "Reetesh Ghosh",
    designation: "Member",
    imageSrc: "/images/members/reeteshghosh_member.jpeg",
  },
  {
    name: "Rini Ganguly",
    designation: "Advisor",
    imageSrc: "/images/members/rg_adv.jpeg",
  },
  {
    name: "Shantanu Dev",
    designation: "Advisor",
    imageSrc: "/images/members/sh_dev.jpeg",
  },
  {
    name: "Shantanu Raha",
    designation: "Advisor",
    imageSrc: "/images/members/Advisor_SantanuRaha.jpeg",
  },
  {
    name: "Srikar Challa",
    designation: "Member",
    imageSrc: "/images/members/srikar_challa_member.jpeg",
  },
  {
    name: "Somak Bhattacharya",
    designation: "Member",
    imageSrc: "/images/members/SomakBhattacharya.jpeg",
  },
  {
    name: "Sukanya Ghosh",
    designation: "Member",
    imageSrc: "/images/members/sk_gh.jpeg",
  },
  {
    name: "Suvendra Chakrabarti",
    designation: "Member",
    imageSrc: "/images/members/suvendra.jpeg",
  },
  {
    name: "Uma Venkateswaran",
    designation: "Member",
    imageSrc: "/images/members/UmaVenkateswaran.jpeg",
  },
  {
    name: "Venky Neelakantan",
    designation: "Chief Environmental Officer",
    imageSrc: "/images/members/vkn_chief_env_of.jpeg",
  },
];

const Event = z.record(
  z.object({
    description: z.array(z.string()),
    title: z.string(),
    link: z.string().url().nullable(),
    linkText: z.string(),
  })
);

const EVENTS: z.infer<typeof Event> = {
  fiveKRun: {
    description: [
      `Sankalpa, in collaboration with Plainsboro Township, is excited to host the **3rd Annual 5K
Run/2K Walk on May 17, 2025, at Plainsboro Community Park! With record-breaking
participation over the last two years, this event continues to grow, bringing together runners,
walkers, families, and community members for a meaningful cause.`,
      `This year, all donations will support the DARE Program in the West Windsor Plainsboro school
district, helping to educate and empower local youth by promoting drug resistance and making
positive life choices. But that's not all! In partnership with **Evergreen, Sankalpa will **plant a
tree for every participant, ensuring that each step taken during the run also contributes to a
greener, healthier planet.`,
      `Whether you're a seasoned runner or just looking for a fun way to get involved, this event is
perfect for all ages and fitness levels. Come be a part of an initiative that combines fitness,
community engagement, and environmental stewardship.`,
      `Bring your friends, family, and neighbors—let's run, walk, and make an impact together!`,
    ],
    title: "Community 5K Run",
    link: `https://runsignup.com/Race/NJ/Plainsboro/Sankalpa5Krun`,
    linkText: "Register Now",
  },
  foodDrive: {
    description: [
      `
      As the holiday season approaches, we are reminded of the power of community and the impact
of giving. Last year like other years, our Annual Holiday Food Drive was a testament to the
generosity and kindness of our neighbors.
      `,
      `
      Thanks to your incredible support, we were able to collect and donate enough food to help
families in need. Your contributions—whether big or small—made a meaningful difference,
ensuring that no one in our community goes hungry during this special time of the year.
      `,
      `
      A heartfelt thank you to everyone who donated, spread the word, and volunteered to make this
drive a success. Your compassion and generosity continue to inspire us, and we are grateful to be
part of such a caring community.
      `,
    ],
    title: "Annual Holiday Food Drive",
    link: null,
    linkText: "",
  },
  toyDrive: {
    description: [
      `Like every year, Sankalpa proudly hosted its annual Toy Drive, spreading joy and hope to
children in need. During this special holiday season, we invite our wonderful community to
come together and make a difference. By donating new, unwrapped toys, you can bring
happiness to a child who deserves to feel special and cherished.`,
      `With the support of generous neighbors and kind-hearted individuals, we continue to brighten the
season for countless children—because every child deserves the magic of play!`,
    ],
    link: null,
    linkText: "",
    title: "Toy Drive",
  },
  Picnic: {
    description: [
      `What better way to enjoy the sunshine than a Summer Picnic with Purpose? Sankalpa
organizes a day of fun, friendship, and environmental action!`,
      `Meet fellow environmental enthusiasts and strengthen our community. Learn how you can
contribute to sustainability efforts and become a part of our organization. Bring your friends,
share delicious food, and participate in eco-friendly activities that support our cause.Experience
the beauty we strive to protect while engaging in meaningful discussions about our initiatives.`,
      `Whether you're already involved or just curious, this is a great opportunity to relax, connect,
and make an impact. Come for the picnic, stay for the mission—because together, we can
create a greener, more sustainable future!`,
    ],
    link: null,
    linkText: "",
    title: "Annual Picnic",
  },
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#493915",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      borderBottom: "1px solid #777777",

      "::placeholder": {
        color: "gray",
        fontSize: "16px",
      },
      ":-webkit-autofill": {
        color: "#e39f48",
      },
    },
    invalid: {
      color: "#E25950",

      "::placeholder": {
        color: "#FFCCA5",
      },
    },
  },
};

type EventSchema = z.infer<typeof Event>;

export { CARD_ELEMENT_OPTIONS, EVENTS, MEMBERS };

  export type { EventSchema };

