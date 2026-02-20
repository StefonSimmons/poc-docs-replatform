## Table of Contents

- [Docs Replatform Proof of Concept](#docs-replatform-proof-of-concept)
  - [Local Development](#local-development)
    - [Use GitHub Token](#use-github-token)
    - [Start the Local Astro Server](#start-the-local-astro-server)
  - [Load and Fetch Upstream](#load-and-fetch-upstream)
    - [SSR with REST as an Astro Action](#ssr-with-rest-as-an-astro-action)
    - [SSR with GraphQL as an Astro Action](#ssr-with-graphql-as-an-astro-action)
    - [SSR with GraphQL as a Live Content Loader (LCL)](#ssr-with-graphql-as-a-live-content-loader-lcl)
    - [SSG with GraphQL as a build-time Content Loader (CL)](#ssg-with-graphql-as-a-build-time-content-loader-cl)
- [Components Section](#components-section)
  - [Problem](#problem)
  - [Solution](#solution)
    - [Atomic Design Model](#atomic-design-model)
    - [Contribution Standards](#contribution-standards)

- [Code Issues and Resolutions](#code-issues-and-resolutions)
  - [Added `.pnp.cjs`, `.pnp.loader.mjs` and `.yarn/install-state.gz` Files](#added-pnpcjs-pnploader-mjs-and-yarninstall-stategz-files)

# Docs Replatform Proof of Concept

1. **Load and Fetch Upstream**: Renders Docs Integrations using 4 different load and fetch combinations. Requires markdown content in `websites-sources`. [See RFC](https://docs.google.com/document/d/1ftkZC4-o0tP1xh5nNy1V_MgDwc8i8yGCuIhO2-m39_c/edit?tab=t.0#heading=h.qnh5oea3lgsp)
2. **Component Page**: Renders all components on a demo page. These components are converted from Hugo Shortcodes 

# Local Development

## Use Github Token
We use `octokit` for our **graphql** requests.
For these requests, we need to generate a short-lived GitHub token provided by Datadog's `ddtool`.

If you are properly logged into `ddtool`, running `yarn start` should properly retrieve the token and start the server. If you should have any trouble, please see the `ddtool` documentation [here](https://datadoghq.atlassian.net/wiki/spaces/ITSEC/pages/5750917294/GitHub+Personal+Access+Tokens).

## Start the local Astro server
```
yarn start
```


# Load and Fetch Upstream
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


# Components Section

The goal of the Components POC layer in this replatform is twofold:

1. **Standardize clearer path toward reusable, testable, discoverable and composable UI elements**
2. **Render Docs Hugo Shortcodes as Astro Components**

As part of this effort, ~50% of the Hugo shortcodes from the Documentation repo have already been converted into Astro components. As a result that equates to ~65% of the shortcode references in Docs. [See the shortcode conversion sheet](https://docs.google.com/spreadsheets/d/1dmhGoiBNU5sm38gZeshcOsqaN3bYbQuKmCGtOG-wAKI/edit?gid=623811061#gid=623811061)

## Problem

Today, components and patterns tend to get duplicated because there’s no easy way for writers or engineers to visually discover what already exists. That leads to:
- Duplicate implementations  
- Repo bloat  
- Inconsistent usage patterns  

The replatform aims to fix that by centralizing UI patterns into approved, reusable components.


## Solution

Create a **component catalog site**, built with Astro + Starlight as seen in this POC.

This site will:
- Serve as the single source of truth for approved components  
- Show how each component looks  
- Document accepted parameters  
- Provide usage examples  
- Include search  

Writers and engineers should rely on this catalog instead of creating ad hoc implementations. Usage should be limited to approved patterns.


### Atomic Design Model

components should move toward an **atomic design model**:
- `Atoms` → smallest UI primitives  
- `Molecules` → composed elements that include atoms
- `Organisms` → more complex entities which include molecules possibly 
- `Wrappers` → layout/context-level  

The goal is to identify common patterns and abstract them into simple, reusable building blocks that can be composed into more complex UI without rewriting the same logic repeatedly.


### Contribution Standards

To prevent drift and duplication, every new component must:
- Include accompanying component tests  
- Include a Markdown documentation page explaining usage and parameters  
- Follow the established folder and naming conventions (simple   



# Code Issues and Resolutions
## Added `.pnp.cjs`, `.pnp.loader.mjs` and `.yarn/install-state.gz` files

**Problem**: Before I could install `vitest` (`yarn add -D vitest`), I needed to bump my version of `node`. I installed `node 24` via `nvm`. When I installed `vitest`, it added Yarn Plug'n'Play files. Yarn 1.22.22 has incomplete support for PnP which broke my `yarn start` script causing a `command not found: export` error.

**Resolution**
bump `yarn` to `berry` version. added `zsh -c` to the beginning of the `start` command
