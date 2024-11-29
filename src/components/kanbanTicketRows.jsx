import React from "react";
import "./kanbanBoard.css";
import { getInitials, getUserName} from "./utils";




export const KanbanTicketRow1 = ({ ticket, grouping, users }) => {
    return (
        <div className="kanban-ticket-row1">
            {grouping === "userId" ? (
                <span className="kanban-ticket-id">{ticket.id}</span>
            ) : (
                <>
                    <span className="kanban-ticket-id">{ticket.id}</span>
                    <div className="user-initials">
                        <span className="initials">{getInitials(getUserName(ticket.userId, users))}</span>
                        <span
                            className={`status-dot ${
                                users.find((user) => user.id.toString() === ticket.userId)?.available
                                    ? "status-online"
                                    : "status-offline"
                            }`}
                        ></span>
                    </div>
                </>
            )}
        </div>
    );
};


export const KanbanTicketRow2 = ({ ticket, grouping, svgs }) => {
    return (
        <div className="kanban-ticket-row kanban-ticket-row2">
            {grouping === "status" ? (
                <h3 className="kanban-ticket-title">{ticket.title}</h3>
            ) : (
                <>
                    {(grouping === "userId" || grouping === "priority") && (
                        <img
                            src={svgs[ticket.status.toLowerCase()] || svgs.defaultStatus}
                            alt={`${ticket.status} Icon`}
                            className="status-icon"
                        />
                    )}
                    <h3 className="kanban-ticket-title">{ticket.title}</h3>
                </>
            )}
        </div>
    );
};

export const KanbanTicketRow3 = ({ ticket, grouping, svgs }) => {
    return (
        <div className="kanban-ticket-row">
            {(grouping === "status" || grouping === "userId") ? (
                <div className="kanban-ticket-tags">
                    <div className="priority-svg">
                        <img
                            src={
                                ticket.priority.toString() === "4"
                                    ? svgs["urgent_grey"]
                                    : svgs[ticket.priority.toString()]
                            }
                            alt="priority icon"
                        />
                    </div>

                    {ticket.tag.map((tag, index) => (
                        <div key={index} className="tag-svg">
                            {tag}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="kanban-ticket-tags">
                    {ticket.tag.map((tag, index) => (
                        <div key={index} className="tag-svg">
                            {tag}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
