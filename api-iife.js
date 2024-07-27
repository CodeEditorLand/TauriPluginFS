if ("__TAURI__" in window) {
	var __TAURI_PLUGIN_FS__ = (function (t) {
		"use strict";
		function e(t, e, n, i) {
			if ("a" === n && !i)
				throw new TypeError(
					"Private accessor was defined without a getter",
				);
			if ("function" == typeof e ? t !== e || !i : !e.has(t))
				throw new TypeError(
					"Cannot read private member from an object whose class did not declare it",
				);
			return "m" === n
				? i
				: "a" === n
					? i.call(t)
					: i
						? i.value
						: e.get(t);
		}
		function n(t, e, n, i, o) {
			if ("function" == typeof e ? t !== e || !o : !e.has(t))
				throw new TypeError(
					"Cannot write private member to an object whose class did not declare it",
				);
			return e.set(t, n), n;
		}
		var i, o, r, a, s, c;
		"function" == typeof SuppressedError && SuppressedError;
		class f {
			constructor() {
				(this.__TAURI_CHANNEL_MARKER__ = !0),
					i.set(this, () => {}),
					o.set(this, 0),
					r.set(this, {}),
					(this.id = (function (t, e = !1) {
						return window.__TAURI_INTERNALS__.transformCallback(
							t,
							e,
						);
					})(({ message: t, id: a }) => {
						if (a === e(this, o, "f")) {
							n(this, o, a + 1), e(this, i, "f").call(this, t);
							const s = Object.keys(e(this, r, "f"));
							if (s.length > 0) {
								let t = a + 1;
								for (const n of s.sort()) {
									if (parseInt(n) !== t) break;
									{
										const o = e(this, r, "f")[n];
										delete e(this, r, "f")[n],
											e(this, i, "f").call(this, o),
											(t += 1);
									}
								}
								n(this, o, t);
							}
						} else e(this, r, "f")[a.toString()] = t;
					}));
			}
			set onmessage(t) {
				n(this, i, t);
			}
			get onmessage() {
				return e(this, i, "f");
			}
			toJSON() {
				return `__CHANNEL__:${this.id}`;
			}
		}
		async function l(t, e = {}, n) {
			return window.__TAURI_INTERNALS__.invoke(t, e, n);
		}
		(i = new WeakMap()), (o = new WeakMap()), (r = new WeakMap());
		class u {
			get rid() {
				return e(this, a, "f");
			}
			constructor(t) {
				a.set(this, void 0), n(this, a, t);
			}
			async close() {
				return l("plugin:resources|close", { rid: this.rid });
			}
		}
		function p(t) {
			return {
				isFile: t.isFile,
				isDirectory: t.isDirectory,
				isSymlink: t.isSymlink,
				size: t.size,
				mtime: null !== t.mtime ? new Date(t.mtime) : null,
				atime: null !== t.atime ? new Date(t.atime) : null,
				birthtime: null !== t.birthtime ? new Date(t.birthtime) : null,
				readonly: t.readonly,
				fileAttributes: t.fileAttributes,
				dev: t.dev,
				ino: t.ino,
				mode: t.mode,
				nlink: t.nlink,
				uid: t.uid,
				gid: t.gid,
				rdev: t.rdev,
				blksize: t.blksize,
				blocks: t.blocks,
			};
		}
		(a = new WeakMap()),
			(t.BaseDirectory = void 0),
			((s = t.BaseDirectory || (t.BaseDirectory = {}))[(s.Audio = 1)] =
				"Audio"),
			(s[(s.Cache = 2)] = "Cache"),
			(s[(s.Config = 3)] = "Config"),
			(s[(s.Data = 4)] = "Data"),
			(s[(s.LocalData = 5)] = "LocalData"),
			(s[(s.Document = 6)] = "Document"),
			(s[(s.Download = 7)] = "Download"),
			(s[(s.Picture = 8)] = "Picture"),
			(s[(s.Public = 9)] = "Public"),
			(s[(s.Video = 10)] = "Video"),
			(s[(s.Resource = 11)] = "Resource"),
			(s[(s.Temp = 12)] = "Temp"),
			(s[(s.AppConfig = 13)] = "AppConfig"),
			(s[(s.AppData = 14)] = "AppData"),
			(s[(s.AppLocalData = 15)] = "AppLocalData"),
			(s[(s.AppCache = 16)] = "AppCache"),
			(s[(s.AppLog = 17)] = "AppLog"),
			(s[(s.Desktop = 18)] = "Desktop"),
			(s[(s.Executable = 19)] = "Executable"),
			(s[(s.Font = 20)] = "Font"),
			(s[(s.Home = 21)] = "Home"),
			(s[(s.Runtime = 22)] = "Runtime"),
			(s[(s.Template = 23)] = "Template"),
			(t.SeekMode = void 0),
			((c = t.SeekMode || (t.SeekMode = {}))[(c.Start = 0)] = "Start"),
			(c[(c.Current = 1)] = "Current"),
			(c[(c.End = 2)] = "End");
		class w extends u {
			async read(t) {
				if (0 === t.byteLength) return 0;
				const [e, n] = await l("plugin:fs|read", {
					rid: this.rid,
					len: t.byteLength,
				});
				return t.set(e), 0 === n ? null : n;
			}
			async seek(t, e) {
				return await l("plugin:fs|seek", {
					rid: this.rid,
					offset: t,
					whence: e,
				});
			}
			async stat() {
				return p(await l("plugin:fs|fstat", { rid: this.rid }));
			}
			async truncate(t) {
				await l("plugin:fs|ftruncate", { rid: this.rid, len: t });
			}
			async write(t) {
				return await l("plugin:fs|write", {
					rid: this.rid,
					data: Array.from(t),
				});
			}
		}
		async function h(t) {
			await l("plugin:fs|unwatch", { rid: t });
		}
		return (
			(t.FileHandle = w),
			(t.copyFile = async function (t, e, n) {
				if (
					(t instanceof URL && "file:" !== t.protocol) ||
					(e instanceof URL && "file:" !== e.protocol)
				)
					throw new TypeError("Must be a file URL.");
				await l("plugin:fs|copy_file", {
					fromPath: t instanceof URL ? t.toString() : t,
					toPath: e instanceof URL ? e.toString() : e,
					options: n,
				});
			}),
			(t.create = async function (t, e) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				const n = await l("plugin:fs|create", {
					path: t instanceof URL ? t.toString() : t,
					options: e,
				});
				return new w(n);
			}),
			(t.exists = async function (t, e) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				return await l("plugin:fs|exists", {
					path: t instanceof URL ? t.toString() : t,
					options: e,
				});
			}),
			(t.lstat = async function (t, e) {
				return p(
					await l("plugin:fs|lstat", {
						path: t instanceof URL ? t.toString() : t,
						options: e,
					}),
				);
			}),
			(t.mkdir = async function (t, e) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				await l("plugin:fs|mkdir", {
					path: t instanceof URL ? t.toString() : t,
					options: e,
				});
			}),
			(t.open = async function (t, e) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				const n = await l("plugin:fs|open", {
					path: t instanceof URL ? t.toString() : t,
					options: e,
				});
				return new w(n);
			}),
			(t.readDir = async function (t, e) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				return await l("plugin:fs|read_dir", {
					path: t instanceof URL ? t.toString() : t,
					options: e,
				});
			}),
			(t.readFile = async function (t, e) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				const n = await l("plugin:fs|read_file", {
					path: t instanceof URL ? t.toString() : t,
					options: e,
				});
				return n instanceof ArrayBuffer
					? new Uint8Array(n)
					: Uint8Array.from(n);
			}),
			(t.readTextFile = async function (t, e) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				return await l("plugin:fs|read_text_file", {
					path: t instanceof URL ? t.toString() : t,
					options: e,
				});
			}),
			(t.readTextFileLines = async function (t, e) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				const n = t instanceof URL ? t.toString() : t;
				return await Promise.resolve({
					path: n,
					rid: null,
					async next() {
						null === this.rid &&
							(this.rid = await l(
								"plugin:fs|read_text_file_lines",
								{ path: n, options: e },
							));
						const [t, i] = await l(
							"plugin:fs|read_text_file_lines_next",
							{ rid: this.rid },
						);
						return (
							i && (this.rid = null),
							{ value: i ? "" : t, done: i }
						);
					},
					[Symbol.asyncIterator]() {
						return this;
					},
				});
			}),
			(t.remove = async function (t, e) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				await l("plugin:fs|remove", {
					path: t instanceof URL ? t.toString() : t,
					options: e,
				});
			}),
			(t.rename = async function (t, e, n) {
				if (
					(t instanceof URL && "file:" !== t.protocol) ||
					(e instanceof URL && "file:" !== e.protocol)
				)
					throw new TypeError("Must be a file URL.");
				await l("plugin:fs|rename", {
					oldPath: t instanceof URL ? t.toString() : t,
					newPath: e instanceof URL ? e.toString() : e,
					options: n,
				});
			}),
			(t.stat = async function (t, e) {
				return p(
					await l("plugin:fs|stat", {
						path: t instanceof URL ? t.toString() : t,
						options: e,
					}),
				);
			}),
			(t.truncate = async function (t, e, n) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				await l("plugin:fs|truncate", {
					path: t instanceof URL ? t.toString() : t,
					len: e,
					options: n,
				});
			}),
			(t.watch = async function (t, e, n) {
				const i = { recursive: !1, delayMs: 2e3, ...n },
					o = Array.isArray(t) ? t : [t];
				for (const t of o)
					if (t instanceof URL && "file:" !== t.protocol)
						throw new TypeError("Must be a file URL.");
				const r = new f();
				r.onmessage = e;
				const a = await l("plugin:fs|watch", {
					paths: o.map((t) => (t instanceof URL ? t.toString() : t)),
					options: i,
					onEvent: r,
				});
				return () => {
					h(a);
				};
			}),
			(t.watchImmediate = async function (t, e, n) {
				const i = { recursive: !1, ...n, delayMs: null },
					o = Array.isArray(t) ? t : [t];
				for (const t of o)
					if (t instanceof URL && "file:" !== t.protocol)
						throw new TypeError("Must be a file URL.");
				const r = new f();
				r.onmessage = e;
				const a = await l("plugin:fs|watch", {
					paths: o.map((t) => (t instanceof URL ? t.toString() : t)),
					options: i,
					onEvent: r,
				});
				return () => {
					h(a);
				};
			}),
			(t.writeFile = async function (t, e, n) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				await l("plugin:fs|write_file", e, {
					headers: {
						path: t instanceof URL ? t.toString() : t,
						options: JSON.stringify(n),
					},
				});
			}),
			(t.writeTextFile = async function (t, e, n) {
				if (t instanceof URL && "file:" !== t.protocol)
					throw new TypeError("Must be a file URL.");
				await l("plugin:fs|write_text_file", {
					path: t instanceof URL ? t.toString() : t,
					data: e,
					options: n,
				});
			}),
			t
		);
	})({});
	Object.defineProperty(window.__TAURI__, "fs", {
		value: __TAURI_PLUGIN_FS__,
	});
}
