import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "4us2f7vp",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-01-31",
});

export const clientWithAuth = sanityClient({
  projectId: "4us2f7vp",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-01-31",
  // While it is not good practise to check in tokens with the source code,
  // this is a read-only token for a public dataset. The only extra power it
  // grants is the ability to get draft contents, and I don't expect drafts for this
  // site to contain very secret stuff - ever. Hence, this particular token is not
  // very important and we just keep it in Git and in public compiled source code.
  token:
    "skerhRbxiu2Hv1p1ontTQbNdOoJpqhUrdEPwihpW9KKIU7Eq1xZUileRr2EvUX7XE9ZGcJVcHW7fRJHaNXQYq2YeSr6A88OansFKvKORrX7xGg26nw22Dmw683aV46cMniEvYEZKtRI490MjZxemnWGNVOI3NizKu9nnHkI9XmWKwLbksmUy",
});

export default client;
