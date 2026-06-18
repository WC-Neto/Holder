import { Box, Button, Card, CardActionArea, Stack, Typography, Chip, IconButton } from "@mui/material";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PlumbingOutlinedIcon from "@mui/icons-material/PlumbingOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import OrderMetaInfo from "../volunteer/OrderMetaInfo";
import UrgencyBadge from "../volunteer/UrgencyBadge";

const categoryIcons = {
  shopping: LocalGroceryStoreOutlinedIcon,
  repairs: PlumbingOutlinedIcon,
  company: PeopleAltOutlinedIcon,
  other: BoltOutlinedIcon,
};

const iconThemeStyles = {
  default: { bgcolor: "#eef7f8", color: "#96C0BE" },
  neutral: { bgcolor: "#f4f4f6", color: "#253044" }
};

const getStatusStyles = (theme) => {
  switch (theme) {
    case 'open': return { bgcolor: '#dcfbef', color: '#00a76f' };
    case 'in_progress': return { bgcolor: '#e6efff', color: '#0066cc' };
    case 'completed': return { bgcolor: '#f4f4f6', color: '#9ba3b3' };
    default: return { bgcolor: '#f4f4f6', color: '#9ba3b3' };
  }
};

const BaseOrderCard = ({
  title,
  categoryType = "other",
  customIconNode,
  iconColorTheme = "default",
  urgencyTone,
  urgencyLevel,
  description,
  descriptionClampLines,
  dateOrTimeAgo,
  distance,
  neighborhood,
  personName,
  personRole,
  statusLabel,
  statusTheme = "completed",
  actionLayoutType = "buttons",
  primaryButtonLabel,
  primaryButtonDisabled,
  onClickCard,
  onViewDetails,
  onPrimaryAction,
}) => {
  const CategoryIcon = categoryIcons[categoryType] || BoltOutlinedIcon;
  const iconColors = iconThemeStyles[iconColorTheme] || iconThemeStyles.default;
  const statusStyles = getStatusStyles(statusTheme);

  const renderIcon = () => {
    return (
      <Box sx={{
        display: actionLayoutType === "buttons" ? { xs: "none", sm: "grid" } : "grid",
        placeItems: "center",
        width: 42,
        height: 42,
        borderRadius: 3,
        bgcolor: iconColors.bgcolor,
        color: iconColors.color,
        flexShrink: 0,
      }}>
        {customIconNode ? customIconNode : <CategoryIcon sx={{ fontSize: 23 }} />}
      </Box>
    );
  };

  const innerContent = (
    <Box sx={{
      display: "flex",
      alignItems: "flex-start",
      gap: 2,
      height: "100%",
      width: "100%",
      p: actionLayoutType === "clickableArea" ? 3 : { xs: 2, sm: 2.4 },
      boxSizing: "border-box"
    }}>
      <Box sx={{ flexShrink: 0 }}>
        {renderIcon()}
      </Box>

      <Box sx={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1.5, mb: description ? 2 : 1 }}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography component="h2" sx={{
              color: "#20283a",
              fontSize: actionLayoutType === "buttons" ? 18 : 16,
              fontWeight: 800,
              lineHeight: 1.25,
              whiteSpace: actionLayoutType === "clickableArea" ? "nowrap" : "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {title}
            </Typography>
            {dateOrTimeAgo && !distance && (
              <Typography variant="body2" sx={{ color: "#9ba3b3", mt: 0.2 }}>
                {dateOrTimeAgo}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
            {urgencyTone && <UrgencyBadge urgencyTone={urgencyTone} label={urgencyLevel} />}
            {actionLayoutType === "chevron" && (
              <IconButton size="small" onClick={onViewDetails} sx={{ color: "#98a1b0", display: { xs: "none", sm: "inline-flex" } }}>
                <ChevronRightOutlinedIcon />
              </IconButton>
            )}
            {actionLayoutType === "clickableArea" && (
              <ChevronRightOutlinedIcon sx={{ color: "#9ba3b3" }} />
            )}
          </Box>
        </Box>

        {description && (
          <Typography sx={{
            color: "#98a1b0",
            fontSize: 14,
            lineHeight: 1.45,
            mb: 2.4,
            ...(descriptionClampLines ? {
              display: "-webkit-box",
              WebkitLineClamp: descriptionClampLines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            } : {})
          }}>
            {description}
          </Typography>
        )}

        {(distance || neighborhood) && (
          <Box sx={{ mb: 2.4 }}>
            <OrderMetaInfo
              distance={distance}
              neighborhood={neighborhood}
              timeAgo={!distance ? undefined : dateOrTimeAgo}
            />
          </Box>
        )}

        {personName && actionLayoutType === "chevron" && (
          <Stack direction="row" spacing={0.8} sx={{ alignItems: "center", mb: 2 }}>
            <Box sx={{ width: 22, height: 22, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "#f4f6f8", color: "#98a1b0" }}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} />
            </Box>
            <Typography sx={{ color: "#3e4654", fontSize: 13 }}>
              {personName}
            </Typography>
          </Stack>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.4} sx={{ mt: "auto", alignItems: "center", justifyContent: "space-between" }}>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {statusLabel && (
              <Chip
                label={statusLabel}
                size="small"
                sx={{
                  ...statusStyles,
                  fontWeight: 800,
                  height: 24,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  border: "none",
                }}
              />
            )}
          </Box>

          {personName && actionLayoutType === "clickableArea" && (
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: '#9ba3b3' }}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {personName}
              </Typography>
            </Stack>
          )}

          <Box sx={{ display: "flex", gap: 1.4, flex: actionLayoutType === "buttons" ? 1 : "unset", width: actionLayoutType === "buttons" ? { xs: "100%", sm: "auto" } : "auto" }}>
            {actionLayoutType === "buttons" && (
              <>
                <Button
                  variant="outlined"
                  onClick={(e) => { e.stopPropagation(); onViewDetails?.(); }}
                  sx={{
                    minHeight: 46,
                    px: 3,
                    borderRadius: 2,
                    borderColor: "#edf0f4",
                    color: "#3e4654",
                    fontWeight: 800,
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": { borderColor: "#dfe4eb", bgcolor: "#f8f9fb" },
                  }}
                >
                  Ver mais
                </Button>
                <Button
                  variant="contained"
                  disabled={primaryButtonDisabled}
                  onClick={(e) => { e.stopPropagation(); onPrimaryAction?.(); }}
                  sx={{
                    flex: 1,
                    minHeight: 46,
                    borderRadius: 2,
                    bgcolor: "#e4a0aa",
                    background: "linear-gradient(90deg, #dfa0aa 0%, #f0b4a3 100%)",
                    color: "#fff",
                    fontWeight: 800,
                    textTransform: "none",
                    boxShadow: "none",
                    "&:hover": { boxShadow: "none", bgcolor: "#dfa0aa" },
                    "&.Mui-disabled": { color: "#fff", bgcolor: "#96C0BE", background: "#96C0BE" },
                  }}
                >
                  {primaryButtonLabel}
                </Button>
              </>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        bgcolor: "#fff",
        borderColor: "#e7e7ea",
        borderRadius: 3,
        boxShadow: "0 1px 2px rgba(37, 48, 68, 0.03)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {actionLayoutType === "clickableArea" ? (
        <CardActionArea
          onClick={onClickCard}
          sx={{ display: 'block', height: '100%', alignItems: 'stretch' }}
        >
          {innerContent}
        </CardActionArea>
      ) : (
        innerContent
      )}
    </Card>
  );
};

export default BaseOrderCard;
