
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.29.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\App.svelte generated by Svelte v3.29.0 */

    const { console: console_1 } = globals;
    const file = "src\\App.svelte";

    // (142:2) {:else}
    function create_else_block(ctx) {
    	let img;
    	let img_src_value;
    	let t0;
    	let br0;
    	let t1;
    	let input0;
    	let br1;
    	let t2;
    	let input1;
    	let br2;
    	let t3;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			img = element("img");
    			t0 = space();
    			br0 = element("br");
    			t1 = space();
    			input0 = element("input");
    			br1 = element("br");
    			t2 = space();
    			input1 = element("input");
    			br2 = element("br");
    			t3 = space();
    			button = element("button");
    			button.textContent = "Login";
    			if (img.src !== (img_src_value = /*src*/ ctx[3])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "person icon in black circle");
    			add_location(img, file, 142, 2, 3487);
    			add_location(br0, file, 142, 50, 3535);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "placeholder", "Username");
    			add_location(input0, file, 143, 4, 3544);
    			add_location(br1, file, 143, 70, 3610);
    			attr_dev(input1, "type", "password");
    			attr_dev(input1, "placeholder", "Password");
    			add_location(input1, file, 144, 4, 3619);
    			add_location(br2, file, 144, 74, 3689);
    			add_location(button, file, 145, 4, 3698);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, input0, anchor);
    			set_input_value(input0, /*Username*/ ctx[0]);
    			insert_dev(target, br1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, input1, anchor);
    			set_input_value(input1, /*Password*/ ctx[1]);
    			insert_dev(target, br2, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, button, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[8]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[9]),
    					listen_dev(button, "click", /*Login*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*Username*/ 1 && input0.value !== /*Username*/ ctx[0]) {
    				set_input_value(input0, /*Username*/ ctx[0]);
    			}

    			if (dirty & /*Password*/ 2 && input1.value !== /*Password*/ ctx[1]) {
    				set_input_value(input1, /*Password*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(input0);
    			if (detaching) detach_dev(br1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(input1);
    			if (detaching) detach_dev(br2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(button);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(142:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (113:2) {#if loggedIn}
    function create_if_block(ctx) {
    	let div;
    	let form0;
    	let label0;
    	let t0;
    	let input0;
    	let t1;
    	let button0;
    	let br;
    	let t3;
    	let form1;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let input2;
    	let t6;
    	let button1;
    	let t8;
    	let p;
    	let t10;
    	let section;
    	let ul;
    	let em;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			form0 = element("form");
    			label0 = element("label");
    			t0 = text("New Enemy\n         \t \t\t\t");
    			input0 = element("input");
    			t1 = space();
    			button0 = element("button");
    			button0.textContent = "Add To List";
    			br = element("br");
    			t3 = space();
    			form1 = element("form");
    			label1 = element("label");
    			t4 = text("Edit List\n            \t\t\t\t");
    			input1 = element("input");
    			t5 = space();
    			input2 = element("input");
    			t6 = space();
    			button1 = element("button");
    			button1.textContent = "Change in List";
    			t8 = space();
    			p = element("p");
    			p.textContent = "Click on name To Delete";
    			t10 = space();
    			section = element("section");
    			ul = element("ul");
    			em = element("em");
    			em.textContent = "loading enemies…";
    			attr_dev(input0, "name", "dream");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "maxlength", "100");
    			input0.required = true;
    			attr_dev(input0, "placeholder", "New Entry");
    			add_location(input0, file, 117, 14, 2625);
    			add_location(label0, file, 115, 11, 2579);
    			add_location(button0, file, 119, 11, 2738);
    			add_location(br, file, 119, 54, 2781);
    			attr_dev(form0, "id", "new-entry");
    			add_location(form0, file, 114, 9, 2544);
    			attr_dev(input1, "name", "current");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "maxlength", "100");
    			input1.required = true;
    			attr_dev(input1, "placeholder", "Old Name");
    			add_location(input1, file, 124, 16, 2896);
    			attr_dev(input2, "name", "new");
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "maxlength", "100");
    			input2.required = true;
    			attr_dev(input2, "placeholder", "New Name");
    			add_location(input2, file, 125, 16, 2995);
    			add_location(button1, file, 126, 16, 3090);
    			add_location(label1, file, 122, 11, 2848);
    			attr_dev(form1, "id", "edit-entry");
    			add_location(form1, file, 121, 10, 2814);
    			add_location(p, file, 131, 9, 3219);
    			add_location(em, file, 137, 10, 3396);
    			attr_dev(ul, "id", "dreams");
    			set_style(ul, "text-align", "center");
    			set_style(ul, "list-style-type", "none");
    			add_location(ul, file, 136, 8, 3318);
    			attr_dev(section, "class", "dreams");
    			add_location(section, file, 135, 6, 3285);
    			set_style(div, "text-align", "center");
    			add_location(div, file, 113, 2, 2499);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, form0);
    			append_dev(form0, label0);
    			append_dev(label0, t0);
    			append_dev(label0, input0);
    			append_dev(form0, t1);
    			append_dev(form0, button0);
    			append_dev(form0, br);
    			append_dev(div, t3);
    			append_dev(div, form1);
    			append_dev(form1, label1);
    			append_dev(label1, t4);
    			append_dev(label1, input1);
    			append_dev(label1, t5);
    			append_dev(label1, input2);
    			append_dev(label1, t6);
    			append_dev(label1, button1);
    			append_dev(div, t8);
    			append_dev(div, p);
    			append_dev(div, t10);
    			append_dev(div, section);
    			append_dev(section, ul);
    			append_dev(ul, em);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*Add*/ ctx[5], false, false, false),
    					listen_dev(button1, "click", /*Edit*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(113:2) {#if loggedIn}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let p;
    	let div;

    	function select_block_type(ctx, dirty) {
    		if (/*loggedIn*/ ctx[2]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			p = element("p");
    			div = element("div");
    			if_block.c();
    			add_location(p, file, 110, 1, 2469);
    			add_location(div, file, 111, 1, 2474);
    			attr_dev(main, "class", "svelte-1tky8bj");
    			add_location(main, file, 109, 0, 2461);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, p);
    			append_dev(main, div);
    			if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let { name } = $$props;
    	let Username = "";
    	let Password = "";
    	let loggedIn = false;
    	const dreamsForm = document.getElementById("new-entry");
    	const changeForm = document.getElementById("edit-entry");
    	const dreamsList = document.getElementById("dreams");
    	let src = "https://cdn.glitch.com/44c8815a-b1b4-4987-be6b-edee7bec88bc%2Fthumbnails%2FUser_Avatar_2.png?1601318518008";

    	async function Login(e) {
    		try {
    			const res = await fetch("/login", {
    				method: "POST",
    				body: JSON.stringify({ uname: Username, psw: Password }),
    				headers: { "Content-Type": "application/json" }
    			});

    			const json = await res.json();

    			if (json.newU) {
    				window.alert("New Account Created");
    				populateList();
    				$$invalidate(2, loggedIn = true);
    			} else if (json.login) {
    				window.alert("Login Successful");
    				populateList();
    				$$invalidate(2, loggedIn = true);
    			} else {
    				window.alert("Wrong Password");
    			}
    		} catch(error) {
    			console.error(error);
    		}
    	}

    	async function Add(e) {
    		let newDream = dreamsForm.elements.dream.value;

    		const res = await fetch("/add", {
    			method: "POST",
    			body: JSON.stringify({ dream: newDream }),
    			headers: { "Content-Type": "application/json" }
    		});

    		const json = await res.json();
    		populateList();
    		dreamsForm.reset();
    		dreamsForm.elements.dream.focus();
    	}

    	async function Edit(e) {
    		let old = changeForm.elements.current.value;
    		let Updated = changeForm.elements.new.value;

    		const res = await fetch("/edit", {
    			method: "POST",
    			body: JSON.stringify({ old, new: Updated }),
    			headers: { "Content-Type": "application/json" }
    		});

    		const json = await res.json();
    		populateList();
    		changeForm.reset();
    	}

    	function appendNewDream(dream, id) {
    		const newListItem = document.createElement("li");
    		newListItem.innerText = dream;
    		dreamsList.appendChild(newListItem);

    		newListItem.onclick = async function () {
    			const res = await fetch("/delete", {
    				method: "POST",
    				body: JSON.stringify({ id }),
    				headers: { "Content-Type": "application/json" }
    			});

    			const json = await res.json();
    			newListItem.remove();
    		};
    	}

    	async function populateList() {
    		dreamsList.innertHTML = "";

    		const res = await fetch("/pop", {
    			method: "GET",
    			headers: { "Content-Type": "application/json" }
    		});

    		const json = await res.json();

    		for (var i = 0; i < json.length; i++) {
    			appendNewDream(json[i].dream, json[i]._id);
    		}
    	}

    	const writable_props = ["name"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		Username = this.value;
    		$$invalidate(0, Username);
    	}

    	function input1_input_handler() {
    		Password = this.value;
    		$$invalidate(1, Password);
    	}

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(7, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({
    		name,
    		Username,
    		Password,
    		loggedIn,
    		dreamsForm,
    		changeForm,
    		dreamsList,
    		src,
    		Login,
    		Add,
    		Edit,
    		appendNewDream,
    		populateList
    	});

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(7, name = $$props.name);
    		if ("Username" in $$props) $$invalidate(0, Username = $$props.Username);
    		if ("Password" in $$props) $$invalidate(1, Password = $$props.Password);
    		if ("loggedIn" in $$props) $$invalidate(2, loggedIn = $$props.loggedIn);
    		if ("src" in $$props) $$invalidate(3, src = $$props.src);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		Username,
    		Password,
    		loggedIn,
    		src,
    		Login,
    		Add,
    		Edit,
    		name,
    		input0_input_handler,
    		input1_input_handler
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { name: 7 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[7] === undefined && !("name" in props)) {
    			console_1.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
