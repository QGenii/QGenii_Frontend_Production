import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LOCAL_QUESTIONS } from "./PracticeQuestion";

const syllabus = [
	{
		title: "Output & Basic math operators",
		items: [
			{ label: "Code Output-MCQ", active: true, id: "local-1" }, // <-- local id
			{ label: "Print Coding, Chef!", active: true, id: "local-2"},
			{ label: "Identify Correct Syntax",active: true, id: "local-3" },
			{ label: "Print difference of 10 and 3", active: true, id: "local-4" }, // <-- local id (matches LOCAL_QUESTIONS id)
			{ label: "Correct Syntax for Header",active: true, id: "local-6" },
			{ label: "Print String num" },
			{ label: "Print 8 divided by 2" },
			{ label: "Identify incorrect Syntax" },
			{ label: "Print 108 using 9 and 12" },
			{ label: "Print icem coding on codechef" },
			{
				label: "Printing on Multiple lines + Multiple prints using single demarks",
			},
		],
	},
	{
		title: "Variables and Datatypes",
		items: [{ label: "Variables and Datatypes" }],
	},
	{
		title: "Strings",
		items: [{ label: "Strings", pro: true, id: "print-difference-of-10-and-3" }], // points to local string-length example
	},
	{
		title: "User Inputs",
		items: [],
	},
	{
		title: "Algorithmic Problem-1",
		items: [],
	},
	{
		title: "Conditional Statements",
		items: [],
	},
	{
		title: "Debug Common Errors",
		items: [],
	},
];

const slugify = (text) => {
	if (!text) return "";
	return text
		.toString()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
};

const SyllabusSidebar = ({ onClose }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [completed, setCompleted] = React.useState(() => {
		try {
			const parsed = JSON.parse(
				localStorage.getItem("completedQuestions") || "[]"
			);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	});
	const [current, setCurrent] = React.useState(() => {
		try {
			return localStorage.getItem("currentQuestion") || null;
		} catch {
			return null;
		}
	});

	// helper to read completed safely
	const readCompletedFromStorage = React.useCallback(() => {
		try {
			const parsed = JSON.parse(
				localStorage.getItem("completedQuestions") || "[]"
			);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	}, []);

	// NEW: reliable slug resolver for an item (prefers explicit slug, then LOCAL_QUESTIONS match, then slugified label)
	const getItemSlug = React.useCallback((itemOrLabel) => {
		if (!itemOrLabel) return "";
		if (typeof itemOrLabel === "string") {
			// itemOrLabel may already be a slug or id; try to resolve to known slug
			const byId = (LOCAL_QUESTIONS || []).find(q => q.id === itemOrLabel || q.slug === itemOrLabel);
			return byId ? byId.slug : itemOrLabel;
		}
		// object: prefer explicit slug, then match by id, then fall back to slugify(label)
		if (itemOrLabel.slug) return itemOrLabel.slug;
		if (itemOrLabel.id) {
			const byId = (LOCAL_QUESTIONS || []).find(q => q.id === itemOrLabel.id || q.slug === itemOrLabel.id);
			if (byId) return byId.slug;
		}
		const byLabelMatch = (LOCAL_QUESTIONS || []).find(q => slugify(q.slug) === slugify(itemOrLabel.label));
		if (byLabelMatch) return byLabelMatch.slug;
		return slugify(itemOrLabel.label || "");
	}, []);

	// central update routine (supports event.detail usage) - only update fields that exist in detail
	const updateFromSource = React.useCallback(
		(detail) => {
			if (detail) {
				if (detail.hasOwnProperty('completed')) {
					try { setCompleted(Array.isArray(detail.completed) ? detail.completed : []); } catch { setCompleted([]); }
				}
				if (detail.hasOwnProperty('current')) {
					try { setCurrent(detail.current || null); } catch { setCurrent(null); }
				}
				return;
			}
			// fallback: read from localStorage
			try { setCompleted(readCompletedFromStorage()); } catch { setCompleted([]); }
			try { setCurrent(localStorage.getItem('currentQuestion') || null); } catch { setCurrent(null); }
		},
		[readCompletedFromStorage]
	);

	React.useEffect(() => {
		const onUpdate = (e) => {
			if (e && e.detail) {
				updateFromSource(e.detail);
				return;
			}
			// storage event - only react to relevant keys to avoid unnecessary work
			if (!e || !e.key || (e.key !== "completedQuestions" && e.key !== "currentQuestion")) {
				// In case of custom events or other triggers, fall back to full read
				if (!e || e.type === "syllabus:update") updateFromSource();
				return;
			}
			updateFromSource();
		};

		window.addEventListener("syllabus:update", onUpdate);
		window.addEventListener("storage", onUpdate);
		return () => {
			window.removeEventListener("syllabus:update", onUpdate);
			window.removeEventListener("storage", onUpdate);
		};
	}, [updateFromSource]);

	// NEW: update sidebar state on in-tab navigation (react-router location changes)
	React.useEffect(() => {
		const match = location.pathname.match(/\/question\/([^/?#]+)/);
		if (match) {
			const pathSegment = match[1];
			// If pathSegment is a local id, resolve to its slug for consistent highlighting
			const resolved = (LOCAL_QUESTIONS || []).find(q => q.id === pathSegment || q.slug === pathSegment);
			const slug = resolved ? resolved.slug : pathSegment;
			try { localStorage.setItem('currentQuestion', slug); } catch {}
			setCurrent(slug);
			setCompleted(readCompletedFromStorage());
			try {
				window.dispatchEvent(new CustomEvent("syllabus:update", { detail: { current: slug, completed: readCompletedFromStorage() } }));
			} catch {}
		}
	}, [location.pathname, readCompletedFromStorage]);

	// central navigation handler - accepts item object or slug string
	const handleNavigateTo = React.useCallback(
		(itemOrSlug) => {
			if (!itemOrSlug) return;

			const slug = getItemSlug(itemOrSlug);
			// determine nav target: prefer explicit item.id if provided, else find local question by slug/id
			let navTarget;
			if (typeof itemOrSlug === 'object' && itemOrSlug.id) {
				navTarget = itemOrSlug.id;
			} else {
				const match = (LOCAL_QUESTIONS || []).find(q => q.slug === slug || q.id === slug);
				navTarget = match ? match.id : slug;
			}

			try { localStorage.setItem("currentQuestion", slug); } catch {}
			setCurrent(slug);
			const comp = readCompletedFromStorage();
			setCompleted(comp);
			try {
				window.dispatchEvent(new CustomEvent("syllabus:update", { detail: { current: slug, completed: comp } }));
			} catch {}
			navigate(`/question/${navTarget}`);
			if (window.innerWidth < 768 && onClose) onClose();
		},
		[navigate, onClose, readCompletedFromStorage, getItemSlug]
	);

	const totalItems = syllabus.reduce((acc, s) => acc + s.items.length, 0);
	const completedSet = new Set(Array.isArray(completed) ? completed : []);
	// use getItemSlug for completed counting to avoid mismatches
	const completedCount = syllabus.reduce(
		(acc, s) => acc + s.items.filter((it) => completedSet.has(getItemSlug(it))).length,
		0
	);
	const percent = totalItems === 0 ? 0 : Math.round((completedCount / totalItems) * 100);

	return (
		<div
			style={{
				width: 320,
				background: "#fff",
				boxShadow: "0 0 16px rgba(0,0,0,0.08)",
				height: "100vh",
				position: "fixed",
				top: 0,
				right: 0,
				zIndex: 1000,
				display: "flex",
				flexDirection: "column",
				borderLeft: "1px solid #e0e0e0",
				overflowY: "auto",
			}}
		>
			{/* Header */}
			<div
				style={{
					padding: "20px 20px 10px 20px",
					borderBottom: "1px solid #f0f0f0",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
					<svg width="32" height="32" fill="none" viewBox="0 0 32 32">
						<circle cx="16" cy="16" r="16" fill="#e3f2fd" />
						<path d="M10 13h12v2H10zm0 4h8v2h-8z" fill="#1976d2" />
					</svg>
					<div>
						<div style={{ fontWeight: 700, fontSize: 16 }}>
							Arrays, Strings &amp; sortings
						</div>
						<div
							style={{
								color: "#1976d2",
								fontSize: 13,
								fontWeight: 500,
								cursor: "pointer",
							}}
						>
							View Full Syllabus
						</div>
					</div>
				</div>
				<button
					onClick={onClose}
					style={{
						background: "none",
						border: "none",
						cursor: "pointer",
					}}
				>
					<svg width="22" height="22" fill="none" viewBox="0 0 24 24">
						<path
							d="M18 6L6 18M6 6l12 12"
							stroke="#333"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</button>
			</div>
			{/* Progress */}
			<div style={{ padding: "16px 20px 8px 20px" }}>
				<div
					style={{
						fontSize: 13,
						color: "#888",
						marginBottom: 6,
					}}
				>
					{percent}% Completed
				</div>
				<div
					style={{
						width: "100%",
						height: 6,
						background: "#f0f4fa",
						borderRadius: 3,
						overflow: "hidden",
					}}
				>
					<div
						style={{
							width: `${percent}%`,
							height: "100%",
							background: "#1976d2",
						}}
					/>
				</div>
			</div>
			{/* Syllabus List */}
			<div
				style={{
					flex: 1,
					overflowY: "auto",
					padding: "0 0 20px 0",
				}}
			>
				{syllabus.map((section, i) => (
					<div key={i}>
						<div
							style={{
								padding: "14px 20px 6px 20px",
								fontWeight: 600,
								fontSize: 14,
								color: "#222",
								display: "flex",
								alignItems: "center",
								cursor: "pointer",
							}}
							// NEW: clicking a section navigates to its first question (if present)
							onClick={() => {
								if (section.items && section.items.length > 0) {
									handleNavigateTo(section.items[0]);
								}
							}}
						>
							<span style={{ marginRight: 8 }}>▾</span>
							{section.title}
						</div>
						{section.items.length > 0 && (
							<div>
								{section.items.map((item, j) => {
									const itemSlug = getItemSlug(item);
									const isCompleted = completedSet.has(itemSlug);
									const isActive = current === itemSlug;
									return (
										<div
											key={j}
											onClick={() => {
												// use item object so handler can prefer item.id when present
												handleNavigateTo(item);
											}}
											style={{
												cursor: "pointer",
												padding: "8px 32px",
												background: isActive ? "#e3f2fd" : "transparent",
												color: isActive ? "#1976d2" : isCompleted ? "#888" : "#333",
												borderRadius: 6,
												fontWeight: isActive ? 600 : 400,
												opacity: isCompleted ? 0.85 : 1,
												margin: "2px 0",
												display: "flex",
												alignItems: "center",
												fontSize: 14,
												position: "relative",
											}}
										>
											{item.label}
											{item.pro && (
												<span
													style={{
														marginLeft: 8,
														background: "#ffe082",
														color: "#b28704",
														fontSize: 11,
														fontWeight: 700,
														borderRadius: 4,
														padding: "2px 6px",
													}}
												>
													PRO
												</span>
											)}
											{isCompleted && (
												<span
													style={{
														position: "absolute",
														right: 16,
														fontSize: 12,
														color: "#1976d2",
													}}
												>
													✓
												</span>
											)}
										</div>
									);
								})}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default SyllabusSidebar;