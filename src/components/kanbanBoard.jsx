import React, { useState, useRef, useEffect } from "react";
import "./kanbanBoard.css";
import svgs from "../assets/index";
import { priorityNames, getInitials, priorityOrder, statusOrder } from "./utils";
import { KanbanTicketRow1, KanbanTicketRow2, KanbanTicketRow3 } from "./kanbanTicketRows";
import useDragToScroll from "../hooks/useDragToScroll";
import useToggleVisibility from "../hooks/useToggleVisibility";

const KanbanBoard = ({ tickets, users }) => {
    const [grouping, setGrouping] = useState(() => {
        return localStorage.getItem("grouping") || "status";
    });
    const [sortBy, setSortBy] = useState(() => {
        return localStorage.getItem("sortBy") || "priority";
    });

    const { handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useDragToScroll();
    const { isVisible: isDropdownOpen, toggleVisibility, ref: dropdownRef } = useToggleVisibility();

    const columnsRef = useRef(null);

    useEffect(() => {
        localStorage.setItem("grouping", grouping);
    }, [grouping]);

    useEffect(() => {
        localStorage.setItem("sortBy", sortBy);
    }, [sortBy]);

    const sortTickets = (tickets) => {
        return [...tickets].sort((a, b) => {
            if (sortBy === "priority") {
                return b.priority - a.priority;
            } else if (sortBy === "title") {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    const groupTickets = (groupBy) => {
        const grouped = {};
        tickets.forEach((ticket) => {
            const key = ticket[groupBy]?.toString() || "Unknown";
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(ticket);
        });
        const fixedOrder =
            groupBy === "status"
                ? statusOrder
                : groupBy === "priority"
                ? priorityOrder.reverse()
                : Object.keys(grouped).sort();

        const orderedGrouped = {};
        fixedOrder.forEach((key) => {
            orderedGrouped[key] = grouped[key] || [];
        });

        return orderedGrouped;
    };
    const groupedTickets = groupTickets(grouping);

    const getUserName = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "Unknown User";
    };

    return (
        <div className="kanban-board">
            {/* Controls */}
            <div className="controls" ref={dropdownRef}>
                <button className="dropdown-toggle" onClick={toggleVisibility}>
                    <img src={svgs.Display} alt="Display Icon" className="icon-display" />
                    Display
                    <img src={svgs.down} alt="Down Arrow" className="icon-arrow" />
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-content">
                        <label>
                            Grouping:
                            <select onChange={(e) => setGrouping(e.target.value)} value={grouping}>
                                <option value="status">Status</option>
                                <option value="userId">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </label>
                        <label>
                            Sort by:
                            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </label>
                    </div>
                )}
            </div>

            {/* Kanban Columns */}
            <div
                className="columns"
                ref={columnsRef}
                onMouseDown={(e) => handleMouseDown(e, columnsRef)}
                onMouseMove={(e) => handleMouseMove(e, columnsRef)}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                {Object.entries(groupedTickets).map(([group, groupTickets]) => (
                    <div key={group} className={`kanban-column kanban-column-${grouping}`}>
                        <div className="kanban-column-header">
                            <div className="kanban-column-left">
                                {grouping === "userId" ? (
                                    <div className="user-initials">
                                        <span className="initials">{getInitials(getUserName(group))}</span>
                                        <span
                                            className={`status-dot ${
                                                users.find((user) => user.id.toString() === group)?.available
                                                    ? "status-online"
                                                    : "status-offline"
                                            }`}
                                        ></span>
                                    </div>
                                ) : (
                                    <img
                                        src={svgs[group.toLowerCase()] || svgs.default}
                                        alt={`${group} Icon`}
                                        className="kanban-column-icon"
                                    />
                                )}
                                <div className="kanban-column-details">
                                    <h2 className="kanban-column-title">
                                        {grouping === "userId"
                                            ? getUserName(group)
                                            : grouping === "priority"
                                            ? priorityNames[group]
                                            : group}
                                    </h2>
                                    <p className="kanban-column-count">{groupTickets.length}</p>
                                </div>
                            </div>
                            <div className="kanban-column-actions">
                                <img src={svgs.add} alt="Add Icon" className="action-icon" />
                                <img src={svgs.dotsmenu} alt="More Options Icon" className="action-icon" />
                            </div>
                        </div>

                        <div className="kanban-tickets">
                            {sortTickets(groupTickets).map((ticket) => (
                                <div key={ticket.id} className="kanban-ticket">
                                    <KanbanTicketRow1 ticket={ticket} grouping={grouping} users={users} />
                                    <KanbanTicketRow2 ticket={ticket} grouping={grouping} svgs={svgs} />
                                    <KanbanTicketRow3 ticket={ticket} grouping={grouping} svgs={svgs} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;