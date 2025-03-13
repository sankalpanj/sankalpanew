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

export { EVENTS, MEMBERS, CARD_ELEMENT_OPTIONS };

export type { EventSchema };
