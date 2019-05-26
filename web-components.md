# Web Components

## The Idea / Goal

- moving initial state out of `json` and `js` into `html`

--> making it easier to work w/ different APIs by providing a unified interface.

## What are they

- html elements defined by the dev
- used to create a user friendly experience
- an component works as an addition to the html 5 standards.

- consist of a combination of html, css and (mainly) javascript.

- they contain their own semantics, behaviors, markup.
- may be shared
- native
- will work everywhere with minimal effort. (your fav frameworks)

> dedicated to the continued backward compatibility of the spec, all but guaranteeing that components written according to the specifications will not suffer from breaking API changes

## How do they work

they combine multiple principles and technologies, that combined create a web-component.

like in the old days:

- css for styling
- inital state html
- tied together by small chunks of simple js

## the three principles

different technogies that partly existed for a years now but never before were so easily utilised to create something bigger then themselves.

UNTIL NOW

(or better: nearly a year ago.)

<!--@TODO-->

we gonna take a look at the three underlining technologies as individual ideas:

- Custom Elements
- Shadow DOM
- HTML templates

--> all following the [HTML Living Standard specification](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements)

- outdated: HTML Modules
