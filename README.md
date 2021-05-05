## sveltecar

https://a4-rmanky.herokuapp.com/

The [*Svelte*](https://svelte.dev/) version of [simcar 2](http://a3-rmanky.herokuapp.com/)!

## Summary

Since I had already flexed my creative-coding muscles when creating the first and second simcar,
I decided to instead learn Svelte and re-create **simcar 2** from the ground up. To be honest I'm 
regretting not creating the original version with Svelte, because it is very helpful. From the creation of
seperate components in different files that can be "plugged into" a central app, to `if()` statements appearing
directly in the `html`, Svelte (and I'm assuming React) provides more abstractions than I thought were possible.

Using rollup was weird, and getting Heroku to not uninstall my dependencies because I had placed them in devDependencies
by mistake, while entirely my fault, was frustrating. 
It makes sense though, why keep npm packages around if they aren't needed?

If I could go back and do **simcar 2** over again though, I would 100% do it with Svelte.

## Other Changes
- Bootstrap instead of Bulma, with [Sveltestrap](http://sveltestrap.js.org/)
- Audio queues for the race starting (was going to add engine noises, but they just sounded bad)
- Removed the dynamic resolution, it was kinda jank but performance may take a hit
    - As before, here is a video of playing/editing/removing just in case: https://youtu.be/MaLs8j6vnOI
- Various stylistic changes


