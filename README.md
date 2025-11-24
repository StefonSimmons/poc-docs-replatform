# Docs Replatform Proof of Concept

Pull in Integrations content (`/content/en/integrations`) from the `webites-sources` Github repository. 

# Local Development
## Use Github Token
We use `octokit` for our **graphql** requests.
For these requests, we need to generate a short-lived GitHub token provided by Datadog's `ddtool`.

If you are properly logged into `ddtool`, running `yarn start` should properly retrieve the token and start the server. If you should have any trouble, please see the `ddtool` documentation [here](https://datadoghq.atlassian.net/wiki/spaces/ITSEC/pages/5750917294/GitHub+Personal+Access+Tokens).

## Start the local Astro server
```
yarn start
```


# Short-term findings
Built a Proof of Concept (POC) here that fetches integrations from `websites-sources` four ways. It leverages **SSR** and **SSG** astro solutions and **REST** vs **GraphQL** fetches.

## SSR with REST as an Astro Action
`http://localhost:4321/integrations-ssr-rest`

Using the Github REST API I found that for integrations, I would need to make 2 requests - one for the integrations tree and another for the file content in order to get the frontmatter for the integrations list page which currently includes a tile UI component with integration name and description.

## SSR with GraphQL as an Astro Action
`http://localhost:4321/integrations-ssr-gql`

Using the Github GraphQL API, I found that for integrations, I formed a query that allowed me to only make 1 request for the integration tree and content of each item in the tree. This saves the number of requests we make

## SSR with GraphQL as a Live Content Loader (LCL)
`http://localhost:4321/integrations-ssr-lcc`

Using the Github GraphQL in a Live Content Loader, I found that I maintain the request frequency advantage of GraphQL. Benefits from a native tool designed for fetching page content (LCL) v.s Astro **actions** which are really to be used for user interactions like form submissions.  With LCL, we can easily filter content before rendering with getLiveEntry().

## SSG with GraphQL as a build-time Content Loader (CL)
`http://localhost:4321/integrations-ssg-acl`

Using the Github GraphQL in a build-time Content Loader, I instantly experience quicker page load time in comparison with SSR. Integrations have more content than we would probably want to render on-demand and so this solution seems appropriate for this content. CL has many features available including validating our output with schema validation and a way to support cache management with the use of meta and digest generation props.
